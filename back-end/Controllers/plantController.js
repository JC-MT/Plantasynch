const express = require('express');
const plants = express.Router();
const explorePlants = require('../Models/ExplorePlants')
const {getPlantsToWater} = require('../Queries/lastWater')
const { updateWater } = require('../Queries/updateWater')

const {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant
} = require('../Queries/plants');

//INDEX
plants.get('/', async (req, res) => {
  const allPlants = await getAllPlants();
  if (allPlants) {
    res.status(200).json({ payload: allPlants });
  } else {
    res.status(404).json({ status: 404, error: 'Plants could not be found' });
  }
});

//EXPLORE INDEX
plants.get('/explore', (req, res) => {
  if (explorePlants) {
    res.status(200).json({ payload: explorePlants });
  } else {
    res.status(404).json({ status: 404, error: 'Plants could not be found' });
  }
});

//NAVBAR ICON
plants.get('/notification', async (req, res) => {
 const notification = await getPlantsToWater();
  if (notification) {
    res.status(200).json({ payload: notification });
  } else {
    res.status(404).json({ status: 404, error: 'Plants could not be found' });
  }
});

//UPDATE WATER
plants.put('/water/:id', async (req, res) => {
  const { id } = req.params;
  const newDay = await updateWater(id);
   if (newDay) {
     res.status(200).json({ payload: newDay });
   } else {
     res.status(404).json({ status: 404, error: 'Date could not be updated' });
   }
 });


// SHOW
plants.get('/:id', async (req, res) => {
  const { id } = req.params;
  const plant = await getPlant(id);

  if (plant[0]) {
    res.status(200).json({ success: true, payload: plant[0] });
  } else {
    res
      .status(404)
      .json({
        success: false,
        payload: `Plant with id:'${id}' could not be found`
      });
  }
});

// EXPLORE SHOW
plants.get('/explore/:id', async (req, res) => {
  const { id } = req.params;
  if (explorePlants[id]) {
    res.status(200).json({ payload: explorePlants[id] });
  } else {
    res.status(404).json({ status: 404, error: `Plant with id:'${id}' could not be found` });
  }
});

//CREATE
plants.post('/', async (req, res) => {
  const newPlant = await createPlant(req.body);
  if (newPlant) {
    res.status(200).json({ success: true, payload: newPlant });
  } else {
    res
      .status(404)
      .json({ success: false, payload: 'Plant could not be created' });
  }
});

//UPDATE
plants.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPlant = await updatePlant(id, req.body);
  if (updatedPlant.id) {
    res.status(200).json({ success: true, payload: updatedPlant });
  } else {
    res
      .status(404)
      .json({
        success: false,
        payload: `Plant with id:'${id}' could not be updated`
      });
  }
});

//DELETE
plants.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedPlant = await deletePlant(id);
  if (deletedPlant.id) {
    res.status(200).json({ success: true, payload: deletedPlant });
  } else {
    res
      .status(404)
      .json({
        success: false,
        payload: `Plant with id:'${id}' could not be deleted`
      });
  }
});

//=======TODO========
//
// //CREATE
// plants.post('/user', async (req, res) => {
//   const newUser = await createUser(req.body);
//   if (newUser) {
//     res.status(200).json({ success: true, payload: newUser });
//   } else {
//     res
//       .status(404)
//       .json({ success: false, payload: 'User could not be created' });
//   }
// });

module.exports = plants;
