const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const CONTACTS = [
  "+916396462355"
];

exports.sendSMS = async (message) => {
  for (let number of CONTACTS) {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: number
    });
  }
};

exports.makeCall = async () => {
  for (let number of CONTACTS) {
    await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: number,
      from: process.env.TWILIO_PHONE
    });
  }
};