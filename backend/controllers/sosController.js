const { sendSMS, makeCall } = require("../services/twilioService");

let lastLocation = null;

exports.updateLocation = (req, res) => {
  const { lat, lng } = req.body;
  lastLocation = { lat, lng };

  console.log("Location updated:", lat, lng);
  res.json({ success: true });
};

exports.sendSOS = async (req, res) => {
  if (!lastLocation) {
    return res.status(400).json({ error: "No location available" });
  }

  const mapLink = `https://www.google.com/maps?q=${lastLocation.lat},${lastLocation.lng}`;

  await sendSMS(`🚨 SOS ALERT! Location: ${mapLink}`);

  res.json({ success: true });
};

exports.triggerCall = async (req, res) => {
  await makeCall();
  res.json({ success: true });

const axios = require("axios");


};