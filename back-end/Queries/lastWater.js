const db = require('../db/dbConfig');
const { readyToBeWatered } = require('../Validations/LastWater');

const getPlantsToWater = async () => {
  const plantsToWater = {};

  function getAverage(skip_history){
    return skip_history ? Math.round(skip_history.reduce((a, b) => a + b) / skip_history.length) : 0;
  }

  try {
    const allPlants = await db.any(
      'SELECT id, last_water, category, skip_count, skip_history FROM garden'
    );

    for (let plant of allPlants) {

      if (
        readyToBeWatered(plant.last_water) > (5 + getAverage(plant.skip_history)) &&
        plant.category !== 'Cactus & Succulent' &&
        plant.skip_count < 1
      ) {

        try {
          const getPlant = await db.any(
            'SELECT * FROM platasynch_users JOIN garden ON platasynch_users.email = garden.email WHERE garden.id=$1',
            plant.id
          );

          let emailToBeSent = getPlant[0].email

          if(plantsToWater[emailToBeSent]){
            plantsToWater[emailToBeSent].push(getPlant[0])

          } else {
            plantsToWater[emailToBeSent] = getPlant;
          }

        } catch (error) {
          return error;
        }

      } else if (
        readyToBeWatered(plant.last_water) > (10 + getAverage(plant.skip_history)) &&
        plant.category === 'Cactus & Succulent' &&
        plant.skip_count < 1
      ) {

        try {
          const getPlant = await db.any(
            'SELECT * FROM garden WHERE id=$1',
            plant.id
          );

          let emailToBeSent = getPlant[0].email

          if(plantsToWater[emailToBeSent]){
            plantsToWater[emailToBeSent].push(getPlant[0])

          } else {
            plantsToWater[emailToBeSent] = getPlant;
          }
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
