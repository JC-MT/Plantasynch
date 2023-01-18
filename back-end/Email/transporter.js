const nodemailer = require('nodemailer');
const { getPlantsToWater } = require('../Queries/lastWater');
const { getAllUsers } = require('../Queries/users')
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
  const allUsers = await getAllUsers();

  if (info) {
    for (let user of info) {
      transporter.sendMail(
        {
          from: EMAIL_ADDRESS,
          to: user.email,
          subject: `Plantasynch Digest- Wed Jan 18`,
          text: `We recommend you look at your ${user.name}. The last time you watered your plant friend was ${user.last_water}.`,
          html: `<div style="display:grid;align-content: center;place-items: center"> 
            <h2 style="margin: 0px;">Hi there! Our database suggests your ${user.name} is ready to be watered.</h2> 
            <h2><a href="https://plantasync.netlify.app/my-plants/${user.id}" style="margin: 0px;padding: 2px;color: #cefad0;text-decoration-thickness: 2px;text-underline-offset: 5px;">Click here to see more 🪴</a></h2>
            <div style="display: flex;column-gap: 20px;">
            <img style="border-radius: 9999px;width:150px;height:150px" src='${user.image}' />
            <div>
            <h3 style="margin: 0px;padding: 2px;">Plant Details</h3>
            <h4 style="margin: 0px;padding: 2px;">Name: ${user.name}</h4>
            <p>Last Watered: ${user.last_water}</p>
            <p>Category: ${user.category}</p>
            </div>
            </div>
          </div>`
        },
        (error, info) => {
          if (error) console.log(error);
          else console.log('Email sent: ' + info.response);
        }
      );
    }
  } else {
    console.log('No reminders need to be sent.');
  }
};

//HEROKU USE
// sendEmail(getPlantsToWater()),

module.exports = {
  sendEmail
};
