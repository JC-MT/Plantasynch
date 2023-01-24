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
    is_healthy,
    email,
    user_id,
    demo_plant,
    actions,
    skip_count,
    skip_history
  } = plant;
  try {
    const newPlant = await db.one(
      'INSERT INTO garden (name, image, origin, category, ideal_light, ideal_watering, last_water, is_healthy, email, user_id, demo_plant, actions, skip_count, skip_history) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12:json, $13, $14) RETURNING *',
      [
        name,
        image || 'https://img.artpal.com/444151/15-20-2-28-3-14-30m.jpg',
        origin,
        category,
        ideal_light,
        ideal_watering,
        last_water,
        is_healthy,
        email,
        user_id,
        demo_plant,
        actions,
        skip_count,
        skip_history
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
    is_healthy,
    email,
    user_id,
    demo_plant,
    actions,
    skip_count,
    skip_history
  } = plant;

  try {
    const updatePlant = await db.one(
      'UPDATE garden SET name=$1, image=$2, origin=$3, category=$4, ideal_light=$5, ideal_watering=$6, last_water=$7, is_healthy=$8, email=$9, user_id=$10, demo_plant=$11, actions=$12:json, skip_count=$13, skip_history=$14 WHERE id=$15 RETURNING *',
      [
        name,
        image || 'https://img.artpal.com/444151/15-20-2-28-3-14-30m.jpg',
        origin,
        category,
        ideal_light,
        ideal_watering,
        last_water,
        is_healthy,
        email, 
        user_id,
        demo_plant,
        actions,
        skip_count,
        skip_history,
        id
      ]
    )
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
