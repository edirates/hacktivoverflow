const nodemailer = require("nodemailer");

function mailer (recipient, content) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.GMAIL,
        to: recipient,
        subject: "Hacktiv OverFlow Summary",
        html: content
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
} 

module.exports = mailer;