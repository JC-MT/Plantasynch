const db = require('../db/dbConfig');
const { readyToBeWatered } = require('../Validations/LastWater');

const getPlantsToWater = async () => {
  const plantsToWater = [];
  try {
    const allPlants = await db.any('SELECT id, last_water FROM garden');
    for (let plant of allPlants) {
      if (readyToBeWatered(plant.last_water) > 3) {
        try {
          const getPlantsToWater = await db.any(
            'SELECT * FROM garden WHERE id=$1',
            plant.id
          );
          plantsToWater.push(getPlantsToWater[0]);
        } catch (error) {
          return error;
        }
      }
    }
    return plantsToWater[0];
  } catch (error) {
    return error;
  }
};

module.exports = { getPlantsToWater };
