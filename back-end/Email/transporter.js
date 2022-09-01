const nodemailer = require('nodemailer');
const getAllPlants = require('../Queries/lastWater');
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
const sendEmail = async (user) => {
  const info = await user;
  if(user){
    transporter.sendMail(
      {
        from: EMAIL_ADDRESS,
        to: info.email,
        subject: `Plantasynch Reminder for ${info.name}`,
        text: `We recommend you look at your ${info.name}. The last time you watered your plant friend was ${info.last_water}.`
      },
      (error, info) => {
        console.log(user);
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
      }
    );
  } else {
    console.log('No reminders need to be sent.')
  }
};
module.exports = {
  sendEmail
};
