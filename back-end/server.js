require('dotenv').config();
const app = require('./app');
const { sendEmail } = require('./Email/transporter');
const { PORT } = process.env;

app.listen(PORT, () => {
  // sendEmail();
  console.log(`Our Garden 🪴 🌻 🌿 is alive in ${PORT} 🌺 🌷 🪷 `);
});
