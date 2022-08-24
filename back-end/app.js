const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Grow your garden with Plantasynch API 🌿 🪴 🌻');
});

app.use(('*', (req, res) => {
    res.status(404).send('Looks like you got lost in the garden 🥲');
  })
);

module.exports = app;