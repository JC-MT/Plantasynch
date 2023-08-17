const nodemailer = require('nodemailer');
const dayjs = require('dayjs');
const { getPlantsToWater } = require('../Queries/lastWater');
require('dotenv').config();

const { EMAIL_ADDRESS, EMAIL_PASSWORD, AWS_URL } = process.env;

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
  let now = dayjs().format('MMM D, YYYY');
  const plantsToWater = await getPlantsToWater();

  if (Object.keys(plantsToWater).length) {
    for (let [email, plants] of Object.entries(plantsToWater)) {
      let plantHtmlComponent = '';
      let intro = `<div style="align-items-center;max-width:600px;padding: 20px ;display:grid;align-self: center;justify-items: center; justify-content: center;">
      <img alt='logo' style='margin-left:46%;justify-self: center; width: 30px; height: 30px;' src='https://cdn-icons-png.flaticon.com/512/628/628324.png' />
      <h1 style="margin-left:32%;justify:center;justify-self: center; font-family: 'brandon-grotesque'; text: center;letter-spacing: 0em;text-transform: uppercase;">Plantasynch</h1>
    </div>
    <div style="display:grid;align-content: center;">
      <h2 style="padding: 5px;margin: 0px;">We see ${plants.length} ${
        plants.length > 1 ? 'plants need' : 'plant needs'
      } your care 🪴</h2>
      <h4 style="padding: 5px;margin: 0px;">If you decide the plant is not ready to be watered, hit the skip button and Plantasynch will learn and give better suggestions for your specific plant</h4>
    </div>`;
      const footer = `<div style="width:100%;max-width:600px;display:grid;grid-template-columns: 1fr;place-content:space-between;
      padding-top: 8rem;
     padding-top: 3rem;
     padding-bottom: 3rem;
     padding-left: 0.5rem;
     padding-right: 0.5rem;
     min-height: 300px;">
      <div style='justify-self:center;'>
        <h1 style="margin-left:25%;margin-bottom:2px;font-size: 32px; font-family: 'brandon-grotesque'; font-weight: 700; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; letter-spacing: 0.025em;text-transform: uppercase;
                                        ">Plantasynch</h1>
        <p style="margin-left:25%;margin-top:2px;padding-left: 0.5rem;
     padding-right: 0.5rem">Keep your plants alive</p>
      </div>
      <div>
        <div style="margin-left:40%;display: flex; flex-direction: row; place-content: center; gap: 5px;">
          <a style='place-self: center;' href="https://github.com/JC-MT/Plantasynch" target="_blank" rel="noreferrer">
            <img alt='logo' style='place-self: center; width: 30px; height: 30px;' src='https://cdn-icons-png.flaticon.com/512/628/628324.png' />
          </a>
          <a style='place-self: center;' href="https://github.com/JC-MT/Plantasynch" target="_blank" rel="noreferrer">
            <img style="width: 30px; height: 30px; place-self: center;" alt="GitHub" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
          </a>
          <a style='place-self: center;' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer">
            <img style="width: 35px; height: 35px; place-self: center;" alt="LinkedIn" src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png" />
          </a>
        </div>
        <div>
          <p style="text-align: center;">Copyright © Plantasync.netlify.app 2023.</p>
        </div>
      </div>
    </div>`;

      if (plants.length) {
        for (const plant of plants) {
          plantHtmlComponent += `<div style="display:flex;place-content:center;">
      <img style="margin-top:18px;min-width:50%;width:300px;height:300px" src='${
        AWS_URL + plant.image
      }' />
      <div style="width:50%;place-self:center;margin-left: 10px;">
        <h4 style="place-self: left;margin: 0px;padding: 5px;">Name: ${
          plant.name
        }</h4>
        <h4 style="margin: 0px;padding: 5px;">Last Watered: ${dayjs(
          plant.last_water
        ).format('MMM D, YYYY')}</h4>
        <h4 style="margin: 0px;padding: 5px;">Category: ${plant.category}</h4>
        <h3 style="margin: 0px;margin-top: 5px;"> <a href='https://plantasync.netlify.app/my-plants/${
          plant.id
        }' style="padding: 10px;color: #173D0B;text-decoration-thickness: 2px;text-underline-offset: 5px;">Click to water ${
            plant.name
          } 🪴</a></h3>
      </div>
    </div>`;
        }

        transporter.sendMail(
          {
            from: EMAIL_ADDRESS,
            to: email,
            subject: `Plantasynch Reminder- ${now}`,
            text: `Your plant children need your care`,
            html: `<html>
                    <head>
                    </head>
                    <div style="width:100%;">
                      <table align="center" width="600" border="0" cellspacing="0" cellpadding="0" class="m_5070089338408210240em_main_table" style="width:600px;table-layout:fixed">
                      <div style="max-width:600px;display:grid;columns: 2;height:fit-content;">
                        ${intro}
                        ${plantHtmlComponent}
                        ${footer}
                      </table>
                    </div>
                  </html>`
          },
          (error, info) => {
            if (error) console.log(error);
            else console.log('Email sent: ' + info.response);
          }
        );
      }
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
