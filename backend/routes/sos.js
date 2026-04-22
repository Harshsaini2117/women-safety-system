const express = require("express");
const router = express.Router();

const {
  sendSOS,
  updateLocation,
  triggerCall
} = require("../controllers/sosController");

router.post("/send-sos", sendSOS);
router.post("/update-location", updateLocation);
router.post("/trigger-call", triggerCall);

module.exports = router;