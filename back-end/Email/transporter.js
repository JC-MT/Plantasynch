const nodemailer = require('nodemailer');
require("dotenv").config();

const { EMAIL_ADDRESS, EMAIL_PASSWORD, TO_EMAIL_ADDRESS } = process.env
let mailOptions = {
    from: EMAIL_ADDRESS,
    to: TO_EMAIL_ADDRESS,
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send',
  };
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
      },
  });

    // Delivering mail with sendMail method
const sendEmail = () => transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });


module.exports = {
    sendEmail
}