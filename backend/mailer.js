require("dotenv").config({ path: "../.env" });
const nodeMailer = require('nodemailer') 

const account = nodeMailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'peerpressureappinfo@gmail.com', 
        pass: process.env.MAILER_PASSWORD 
    }
}); 

const sendInviteEmail = (user) => {
const emailSettings = { 
    from: 'peerpressureappinfo@gmail.com', 
    to: user, 
    subject: 'You\'ve Been Invited', 
    html: 
        '<h1>You Have Been Invited</h1>'
}; 
account.sendMail(emailSettings, (err, info) => { 
    if (err) { 
        return JSON.stringify(err)
    }
    else { 
        return JSON.stringify(info)
    }
}); 
}