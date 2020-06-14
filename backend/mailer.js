require('dotenv').config({ path: '../.env' });
sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAILER_PASSWORD.trim());

const sendInviteEmail = (user) => {
	const msg = {
		to: user.toString().trim(),
		from: 'info@peerpressure.me',
		subject: "You've been invited to a Peer Pressure group!",
		text: 'You have been invited to the a Peer Pressure Group! Get ready to ',
		html:
			'<strong>and easy to do anywhere, even with Node.js</strong><a href=#><button type="button" style="display: inherit; margin-top: 15px; margin-left: auto; margin-right: auto; color: white; background-color: black; border-style: none; width: 85px; height: 25px;">JOIN GROUP</button></a>',
	};
	sgMail
		.send(msg)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};
module.exports = { sendInviteEmail };
