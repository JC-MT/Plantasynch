const express = require('express');
const plants = express.Router();
const exploreModel = require('../Models/ExplorePlants')

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
  if (exploreModel) {
    res.status(200).json({ payload: exploreModel });
  } else {
    res.status(404).json({ status: 404, error: 'Plants could not be found' });
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

module.exports = plants;
