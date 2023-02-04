const nodemailer = require('nodemailer');
const dayjs = require('dayjs')
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
  let now = dayjs().format('MMM D, YYYY')
  const plantsToWater = await getPlantsToWater();

  if (Object.keys(plantsToWater).length) {
    for (let [email, plants] of Object.entries(plantsToWater)) {

      let plantHtmlComponent = '';
      let intro = `<div 
      style="display:grid;align-content: center;"> 
  <h2 style="padding: 5px;margin: 0px;">We see ${plants.length} ${plants.length > 1 ? 'plants need' : 'plant needs' } your care 🪴</h2> 
   <h4 style="padding: 5px;margin: 0px;">If you decide the plant is not ready to be watered, hit the skip button and Plantasynch will learn and give better suggestions for your specific plant</h4></div>`
      let logo = `<div style="padding: 20px ;display:flex; flex-direction: column; align-self: center;place-items: center; place-content: center;">
      <img alt='logo' style='place-self: center; width: 30px; height: 30px;' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
             <p style="justify:center;place-self: center;margin: 0px;font-size: 15px; font-family: 'brandon-grotesque'; text: center;letter-spacing: 0em;text-transform: uppercase;">Plantasynch</p>
     </div>`
      let footer = `<div style="margin-top:50px;text:left;display:grid;place-content:space-between;
      padding-top: 8rem;
     padding-top: 3rem;
     padding-bottom: 3rem;
                         padding-left: 0.5rem;
     padding-right: 0.5rem;height: 400px;
  ;background-color: #9EC2AF;">
      <div>
                 <h1 style="text: #rgb(23,61,10); font-size: 32px; font-family: 'brandon-grotesque'; font-weight: 700; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; letter-spacing: 0.025em;text-transform: uppercase;
                                        ">Plantasynch</h1>
                 <p style="padding-left: 0.5rem;
     padding-right: 0.5rem">Keep your plants alive</p>
     </div>
         <div style="display: flex; flex-direction: row; place-content: center; gap: 1em;">
                 <a style='place-self: center;'href="https://github.com/JC-MT/Plantasynch" target="_blank" rel="noreferrer">
                     <img
                     style="width: 30px; height: 30px; place-self: center;"
                     alt="GitHub"
                     src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                     />
                 </a>
                 <a style='place-self: center;' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer" >
                     <img
                     style="width: 35px; height: 35px; place-self: center;"
                     alt="LinkedIn"
                     src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
                     />
                 </a>
          </div>
        <div>
          <p className="text-sm">© 2023 Plantasynch, a project with no intention to profit.</p>
        </div>
         </div>`

      if(plants.length){
        for(let plant of plants){
          plantHtmlComponent += `<div><img style="margin-top: 18px ;width:300px;height:300px" src='${plant.image}' /><h4 style="place-self: left;margin: 0px;padding: 5px;">Name: ${plant.name}</h4><h4 style="margin: 0px;padding: 5px;">Last Watered: ${dayjs(plant.last_water).format('MMM D, YYYY')}</h4><h4 style="margin: 0px;padding: 5px;">Category: ${plant.category}</h4>
          <h3 style="margin: 0px;margin-top: 5px;"> <a href='https://plantasync.netlify.app/my-plants/${plant.id}' style="padding: 10px;color: #173D0B;text-decoration-thickness: 2px;text-underline-offset: 5px;">Click to water ${plant.name} 🪴</a></h3></div>`
        }

        transporter.sendMail(
          {
            from: EMAIL_ADDRESS,
            to: email,
            subject: `Plantasynch Reminder- ${now}`,
            text: `Your plant children need your care`,
            html: `<div style="display:grid; align-content: center; height: fit-content;">
            ${logo}
            ${intro}
            ${plantHtmlComponent}
            ${footer}</div>`
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
