const cron = require('node-cron');

const scheduler = cron.schedule('* * * * *', () =>
 console.log('Cron is active every 1 minute interval')
);

module.exports = scheduler