const express = require('express');
const plants = express.Router();
const explorePlants = require('../Models/ExplorePlants')
const { getPlantsToWater } = require('../Queries/lastWater')
const { updateWater } = require('../Queries/updateWater')
const { updateSkipHistory } = require('../Queries/updateSkipHistory')
const { updateSkipCount } = require('../Queries/updateSkipCount')
const { addAction } = require('../Queries/addAction') 

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
 const convertedNotifications = Object.values(notification) .flat() .map ((plant) => { return { id : plant.id } })

  if (convertedNotifications) {
    res.status(200).json({ payload: convertedNotifications });
  } else {
    res.status(404).json({ status: 404, error: 'Plants could not be found' });
  }
});

//UPDATE WATER
plants.put('/water/:id', async (req, res) => {
  const { id } = req.params;
  const newDay = await updateWater(id);
  const newSkipInfo = await updateSkipHistory(id)
  
   if (newDay) {
    const addingAction = await addAction('Watered', id);
    res.status(200).json({ payload: newDay });
   } else {
     res.status(404).json({ status: 404, error: 'Date could not be updated' });
   }
 });

 //UPDATE SKIP
plants.put('/skip/:id', async (req, res) => {
  const { id } = req.params;
  const newSkipCount = await updateSkipCount(req.body, id)
  
   if (newSkipCount) {
    const addingAction = await addAction('Skipped', id);
     res.status(200).json({ payload: newSkipCount });
   } else {
     res.status(404).json({ status: 404, error: 'Date could not be updated' });
   }
 });


// SHOW
plants.get('/:id', async (req, res) => {
  const { id } = req.params;
  const plant = await getPlant(id);

  if (plant.length) {
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
    const addingAction = await addAction('Created', newPlant.id);
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
    const addingAction = await addAction('Updated', id);
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

module.exports = plants;
