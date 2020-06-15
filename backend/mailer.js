require('dotenv').config({ path: '../.env' });
sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAILER_PASSWORD.trim());
const sendInviteEmail = (user, groupId) => {
	const emailButtonStyles =
		'display: inherit; margin-top: 15px; margin-left: auto; margin-right: auto; color: white; background-color: black; border-style: none; width: 85px; height: 25px;';
	const emailHref = `https://salty-basin-04868.herokuapp.com/group_id=${groupId}/add_user_to_group`;
	const msg = {
		to: user.toString().trim(),
		from: 'info@peerpressure.me',
		subject: "You've been invited to a Peer Pressure group!",
		text: 'You have been invited to the a Peer Pressure Group! Get ready to',
		html: `<strong>and easy to do anywhere, even with Node.js</strong><button type="button" style="${emailButtonStyles}"><a style="decoration: none; color: white;" href="${emailHref}">JOIN</a></button>`,
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
