const app = require('./app.js');

require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Our Garden 🪴 🌻 🌿 is alive in ${PORT} 🌺 🌷 🪷 `);
});