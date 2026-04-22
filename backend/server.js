require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

app.use(cors());
app.use(express.json());

let lastLocation = null;

// Twilio
const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// ===== LOCATION =====
app.post("/api/update-location", (req, res) => {
  const { lat, lng } = req.body;

  console.log("📍 Incoming:", req.body);

  if (!lat || !lng) {
    return res.status(400).json({ error: "Invalid location" });
  }

  lastLocation = { lat, lng };

  console.log("📍 Saved:", lastLocation);

  res.json({ success: true });
});

// ===== SOS =====
app.post("/api/send-sos", async (req, res) => {
  console.log("🚨 SOS HIT");

  if (!lastLocation) {
    return res.status(400).json({ error: "No location" });
  }

  const mapLink = `https://www.google.com/maps?q=${lastLocation.lat},${lastLocation.lng}`;

  try {
    console.log("📡 Sending SMS...");

    await client.messages.create({
      body: `🚨 EMERGENCY ALERT!\nLocation: ${mapLink}`,
      from: process.env.TWILIO_PHONE,
      to: process.env.MY_PHONE,
    });

    console.log("📩 SMS SENT");

    console.log("📡 Making Call...");

    const callMessage = encodeURIComponent(
      "Emergency! Please check your phone for location."
    );

    await client.calls.create({
      url: `http://twimlets.com/message?Message=${callMessage}`,
      to: process.env.MY_PHONE,
      from: process.env.TWILIO_PHONE,
    });

    console.log("📞 CALL SENT");

    res.json({ success: true });

  } catch (err) {
    console.log("❌ ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ===== SERVER =====
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on port 5000");
});