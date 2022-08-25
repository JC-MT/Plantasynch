const db = require('../db/dbConfig');

//INDEX
const getAllPlants = async () => {
  try {
    const allPlants = await db.any('SELECT * FROM garden');
    return allPlants;
  } catch (error) {
    return error;
  }
};

//SHOW
const getPlant = async (id) => {
  try {
    const plant = await db.any('SELECT * FROM garden WHERE id=$1', id);
    return plant;
  } catch (error) {
    return error;
  }
};

//CREATE
const createPlant = async (plant) => {
  const {
    name,
    image,
    origin,
    category,
    ideal_light,
    ideal_watering,
    last_water,
    is_healthy
  } = plant;
  try {
    const newPlant = await db.one(
      'INSERT INTO garden (name, image, origin, category, ideal_light, ideal_watering, last_water, is_healthy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        name,
        image,
        origin,
        category,
        ideal_light,
        ideal_watering,
        last_water,
        is_healthy
      ]
    );
    return newPlant;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

//UPDATE
const updatePlant = async (id, plant) => {
  const {
    name,
    image,
    origin,
    category,
    ideal_light,
    ideal_watering,
    last_water,
    is_healthy
  } = plant;
  try {
    const updatePlant = await db.one(
      'UPDATE garden SET name=$1, image=$2, origin=$3, category=$4, ideal_light=$5, ideal_watering=$6, last_water=$7, is_healthy=$8 WHERE id=$9 RETURNING *',
      [
        name,
        image,
        origin,
        category,
        ideal_light,
        ideal_watering,
        last_water,
        is_healthy,
        id
      ]
    );
    return updatePlant;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

//DELETE
const deletePlant = async (id) => {
  try {
    const plant = await db.one(
      'DELETE FROM garden WHERE id=$1 RETURNING *',
      id
    );
    return plant;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

module.exports = {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant
};
