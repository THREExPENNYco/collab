require("dotenv").config({ path: "../.env" });
sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.MAILER_PASSWORD.trim());

const sendInviteEmail = (user) => {
  const msg = {
    to: user.toString().trim(),
    from: "info@peerpressure.me",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then((res) =>{ 
        console.log(res);
    })
    .catch((err) => { 
        console.log(err);
    });
};
module.exports = { sendInviteEmail };
