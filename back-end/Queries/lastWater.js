const db = require('../db/dbConfig');
const { readyToBeWatered } = require('../Validations/LastWater');

const getPlantsToWater = async () => {
  const plantsToWater = [];
  try {
    const allPlants = await db.any(
      'SELECT id, last_water, category, skip_count FROM garden'
    );
    for (let plant of allPlants) {
      if (
        readyToBeWatered(plant.last_water) > 5 &&
        plant.category !== 'Cactus & Succulent' &&
        plant.skip_count < 1
      ) {
        try {
          const getPlant = await db.any(
            'SELECT * FROM garden WHERE id=$1',
            plant.id
          );
          plantsToWater.push(getPlant[0]);
        } catch (error) {
          return error;
        }
      } else if (
        readyToBeWatered(plant.last_water) > 10 &&
        plant.category === 'Cactus & Succulent' &&
        plant.skip_count < 1
      ) {
        try {
          const getPlant = await db.any(
            'SELECT * FROM garden WHERE id=$1',
            plant.id
          );
          plantsToWater.push(getPlant[0]);
        } catch (error) {
          return error;
        }
      }
    }
    return plantsToWater;
  } catch (error) {
    return error;
  }
};

module.exports = { getPlantsToWater };
