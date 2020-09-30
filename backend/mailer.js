require('dotenv').config({
	path: '../.env'
});
sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAILER_PASSWORD.trim());
const sendInviteEmail = (user, groupId) => {
	const styles = {
		tagStyles: 'text-align: center; font-size: 12px;',
		buttonStyles: 'display: inherit; margin-top: 15px; margin-left: auto; margin-right: auto; color: white; background-color: black; border-style: none; width: 85px; height: 25px;'
	}
	const emailHref = `https://salty-basin-04868.herokuapp.com/#/signup`;
	const msg = {
		to: user.toString().trim(),
		from: 'info@peerpressure.me',
		subject: "You've been invited to a Peer Pressure group!",
		text: 'You have been invited to the a Peer Pressure Group!',
		html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
			<head>
			  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
			  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
		  <style type="text/css">
			body {width: 600px;margin: 0 auto;}
			table {border-collapse: collapse;}
			table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
			img {-ms-interpolation-mode: bicubic;}
		  </style>
		<![endif]-->
			  <style type="text/css">
			body, p, div {
			  font-family: arial,helvetica,sans-serif;
			  font-size: 14px;
			}
			body {
			  color: #000000;
			}
			body a {
			  color: #1188E6;
			  text-decoration: none;
			}
			p { margin: 0; padding: 0; }
			table.wrapper {
			  width:100% !important;
			  table-layout: fixed;
			  -webkit-font-smoothing: antialiased;
			  -webkit-text-size-adjust: 100%;
			  -moz-text-size-adjust: 100%;
			  -ms-text-size-adjust: 100%;
			}
			img.max-width {
			  max-width: 100% !important;
			}
			.column.of-2 {
			  width: 50%;
			}
			.column.of-3 {
			  width: 33.333%;
			}
			.column.of-4 {
			  width: 25%;
			}
			@media screen and (max-width:480px) {
			  .preheader .rightColumnContent,
			  .footer .rightColumnContent {
				text-align: left !important;
			  }
			  .preheader .rightColumnContent div,
			  .preheader .rightColumnContent span,
			  .footer .rightColumnContent div,
			  .footer .rightColumnContent span {
				text-align: left !important;
			  }
			  .preheader .rightColumnContent,
			  .preheader .leftColumnContent {
				font-size: 80% !important;
				padding: 5px 0;
			  }
			  table.wrapper-mobile {
				width: 100% !important;
				table-layout: fixed;
			  }
			  img.max-width {
				height: auto !important;
				max-width: 100% !important;
			  }
			  a.bulletproof-button {
				display: block !important;
				width: auto !important;
				font-size: 80%;
				padding-left: 0 !important;
				padding-right: 0 !important;
			  }
			  .columns {
				width: 100% !important;
			  }
			  .column {
				display: block !important;
				width: 100% !important;
				padding-left: 0 !important;
				padding-right: 0 !important;
				margin-left: 0 !important;
				margin-right: 0 !important;
			  }
			  .social-icon-column {
				display: inline-block !important;
			  }
			}
		  </style>
			  <!--user entered Head Start--><!--End Head user entered-->
			</head>
			<body>
			  <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
				<div class="webkit">
				  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
					<tr>
					  <td valign="top" bgcolor="#FFFFFF" width="100%">
						<table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
						  <tr>
							<td width="100%">
							  <table width="100%" cellpadding="0" cellspacing="0" border="0">
								<tr>
								  <td>
									<!--[if mso]>
			<center>
			<table><tr><td width="600">
		  <![endif]-->
											<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
											  <tr>
												<td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
			<tr>
			  <td role="module-content">
				<p></p>
			  </td>
			</tr>
		  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="85070242-c90c-4b22-ab1d-4a4820409327">
			<tbody>
			  <tr>
				<td style="padding:18px 0px 18px 0px; line-height:40px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h1 style="text-align: center"><span style="font-size: 72px; font-family: helvetica,sans-serif">PEER</span></h1>
		<h1 style="text-align: center"><span style="font-size: 72px; font-family: helvetica,sans-serif">PRESSURE</span></h1><div></div></div></td>
			  </tr>
			</tbody>
		  </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9af067c2-5d9f-45ba-9741-9777b9d92dee">
			<tbody>
			  <tr>
				<td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
				  <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="4px" style="line-height:4px; font-size:4px;">
					<tbody>
					  <tr>
						<td style="padding:0px 0px 4px 0px;" bgcolor="#000000"></td>
					  </tr>
					</tbody>
				  </table>
				</td>
			  </tr>
			</tbody>
		  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="be456f4e-af61-4d6d-aae9-8198dd3ea1da">
			<tbody>
			  <tr>
				<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: helvetica,sans-serif">You've been invited to join a peer group!&nbsp;</span></div><div></div></div></td>
			  </tr>
			</tbody>
		  </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="a769bf11-035d-4e62-b47b-cf02d0c9b85f">
			  <tbody>
				<tr>
				  <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
					<table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
					  <tbody>
						<tr>
						<td align="center" bgcolor="#333333" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
						  <a href="https://salty-basin-04868.herokuapp.com/#/signup" style="background-color:#333333; border:1px solid #333333; border-color:#333333; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">JOIN</a>
						</td>
						</tr>
					  </tbody>
					</table>
				  </td>
				</tr>
			  </tbody>
			</table></td>
											  </tr>
											</table>
											<!--[if mso]>
										  </td>
										</tr>
									  </table>
									</center>
									<![endif]-->
								  </td>
								</tr>
							  </table>
							</td>
						  </tr>
						</table>
					  </td>
					</tr>
				  </table>
				</div>
			  </center>
			</body>
		  </html>`,
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
module.exports = {
	sendInviteEmail
};
