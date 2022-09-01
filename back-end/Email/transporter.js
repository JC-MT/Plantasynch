const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Delivering mail with sendMail method
const sendEmail = async (users) => {
  const info = await users;
  if (info) {
    for (let user of info) {
      transporter.sendMail(
        {
          from: EMAIL_ADDRESS,
          to: user.email,
          subject: `Plantasynch Reminder for ${user.name}`,
          text: `We recommend you look at your ${user.name}. The last time you watered your plant friend was ${user.last_water}.`
        },
        (error, info) => {
          console.log(user);
          if (error) console.log(error);
          else console.log('Email sent: ' + info.response);
        }
      );
    }
  } else {
    console.log('No reminders need to be sent.');
  }
};
module.exports = {
  sendEmail
};
