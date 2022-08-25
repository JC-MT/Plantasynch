const express = require('express')
const plants = express.Router()

const {
  getAllPlants,
  getPlant
} = require('../Queries/plants')

//INDEX
plants.get('/', async (req, res) => {
  const allPlants = await getAllPlants()

  if (allPlants) {
    res.status(200).json({ payload: allSnacks })
  } else {
    console.log('we have errors')
    res.status(404).json({ status: 404, error: 'error' })
  }
})

//SHOW
plants.get('/:id', async (req, res) => {
  const { id } = req.params
  const plant = await getPlant(id)
  if (plant[0]) {
    res.status(200).json({ success: true, payload: plant[0] })
  } else {
    res.status(404).json({ success: false, payload: `Plant with id: ${id} could not be found` })
  }
})

module.exports = plants