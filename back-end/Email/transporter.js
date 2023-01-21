const nodemailer = require('nodemailer');
const { getPlantsToWater } = require('../Queries/lastWater');
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
const sendEmail = async () => {
  const plantsToWater = await getPlantsToWater();

  if (Object.keys(plantsToWater).length) {
    for (let [email, plants] of Object.entries(plantsToWater)) {
      
      let plantHtmlComponent = ''

      if(plants.length){
        for(let plant of plants){
          plantHtmlComponent += `<img style="border-radius: 9999px;width:150px;height:150px" src='${plant.image}' /><div><h4 style="margin: 0px;padding: 2px;">Name: ${plant.name}</h4><p>Last Watered: ${plant.last_water}</p><p>Category: ${plant.category}</p>`
        }
      }
      transporter.sendMail(
        {
          from: EMAIL_ADDRESS,
          to: email,
          subject: `Plantasynch Digest- Wed Jan 18`,
          text: `We recommend you look at your . The last time you watered your plant friend was.`,
          html: `<div style="display:grid;align-content: center;place-items: center"> 
            <h2 style="margin: 0px;">Hi there! Our database suggests your  is ready to be watered.</h2> 
            <h2><a href="https://plantasync.netlify.app/my-plants" style="margin: 0px;padding: 2px;color: #cefad0;text-decoration-thickness: 2px;text-underline-offset: 5px;">Click here to see more 🪴</a></h2>
            <div style="display: flex;column-gap: 20px;">${plantHtmlComponent}
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

//Render Cron Job USE
sendEmail();

module.exports = {
  sendEmail
};
