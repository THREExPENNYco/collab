require("dotenv").config({ path: "../.env" });
sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.MAILER_PASSWORD);

const sendInviteEmail = (user) => {
  const msg = {
    to: user,
    from: "test@example.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail.send(msg);
};
module.exports = { sendInviteEmail };
