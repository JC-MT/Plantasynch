const express = require('express');
const cors = require('cors');
const plantController = require('./Controllers/plantController');
const userController = require('./Controllers/userController');
const s3Controller = require('./Controllers/s3Controller');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/plants', plantController);
app.use('/user', userController);
app.use('/images', s3Controller);

app.get('/', (req, res) => {
  res.status(200).send('Grow your garden with Plantasynch API 🌿 🪴 🌻');
});

app.use(
  ('*',
  (req, res) => {
    res.status(404).send('Looks like you got lost in the garden 🥲');
  })
);

module.exports = app;
