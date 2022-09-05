const app = require('./app');
const scheduler = require('./Email/schedule')

require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Our Garden 🪴 🌻 🌿 is alive in ${PORT} 🌺 🌷 🪷 `);
});