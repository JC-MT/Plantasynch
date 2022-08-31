const cron = require('node-cron');
const { sendEmail } = require('./transporter')

// const scheduler = cron.schedule('* * * * *', () =>
//     // sendEmail(),
//     // console.log('Cron is active every 1 minute interval')
// );

module.exports = scheduler