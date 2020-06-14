require('dotenv').config({ path: '../.env' });
sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAILER_PASSWORD.trim());

const sendInviteEmail = (user) => {
	const msg = {
		to: user.toString().trim(),
		from: 'info@peerpressure.me',
		subject: "You've been invited to a Peer Pressure group!",
		text: 'and easy to do anywhere, even with Node.js',
		html:
			'<strong>and easy to do anywhere, even with Node.js</strong><button type="button" style="display: inherit; margin-top: 15px; margin-left: auto; margin-right: auto; color: white; background-color: black; border-style: none; width: 100px; height: 50px;"><a href=#></a></button>',
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
