const db = require('../db/dbConfig')

//INDEX
const getAllPlants = async () => {
  try {
    const allPlants = await db.any('SELECT * FROM garden')
    return allPlants
  } catch (error) {
    return error
  }
}

//SHOW
const getPlant = async (id) => {
  try {
    const plant = await db.any('SELECT * FROM garden WHERE id=$1', id)
    return plant
  } catch (error) {
    return error
  }
}

module.exports = {
    getAllPlants,
    getPlant
  }