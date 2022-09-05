const cron = require('node-cron');
const { getPlantsToWater } = require('../Queries/lastWater');
const { sendEmail } = require('../Email/transporter');

const scheduler = cron.schedule(
  '0 * 12 * * *',
  () => sendEmail(getPlantsToWater()),
  console.log('Cron is active every 1 minute interval')
);

module.exports = scheduler;
