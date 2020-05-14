require("dotenv").config({ path: "../.env" });
const nodeMailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const options = {
  auth: {
    api_user: "apikey", //peerPressureApiKey <-- API key name
    api_key: process.env.MAILER_PASSWORD,
  }
};

const account = nodeMailer.createTransport(sgTransport(options));

const sendInviteEmail = (user) => {
  const email = {
    from: "peerpressureappinfo@gmail.com",
    to: user,
    subject: "You've Been Invited",
    html: "<h1>You Have Been Invited</h1>",
  };
  account.sendMail(email, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
module.exports = { sendInviteEmail };
