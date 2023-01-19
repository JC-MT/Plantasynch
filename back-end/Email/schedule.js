const cron = require('node-cron');
const { getPlantsToWater } = require('../Queries/lastWater');
const { sendEmail } = require('../Email/transporter');

const scheduler = cron.schedule(
  '* * * * *',
  () => 
  // sendEmail(),
  console.log('Cron is active every 1 minute interval')
);

module.exports = scheduler;
