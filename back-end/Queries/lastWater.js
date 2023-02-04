const db = require('../db/dbConfig');
const { readyToBeWatered } = require('../Validations/LastWater');

const getPlantsToWater = async () => {
  const plantsToWater = {};

  function getAverage(skip_history){
    return skip_history.length ? Math.round(skip_history.reduce((a, b) => a + b) / skip_history.length) : 0;
  }

  try {
    const allPlants = await db.any(
      'SELECT id, user_id, name, image, last_water, category, skip_count, skip_history, email FROM garden'
    );

    for (let plant of allPlants) {

      if (
        readyToBeWatered(plant.last_water) > (5 + getAverage(plant.skip_history)) &&
        plant.category !== 'Cactus & Succulent' &&
        plant.skip_count < 1
      ) {

          let emailToBeSent = plant.email.length ? plant.email : 'plantasynch@gmail.com';

          if(plantsToWater[emailToBeSent]){
            plantsToWater[emailToBeSent].push(plant)

          } else {
            plantsToWater[emailToBeSent] = [ plant ];
          }

        } else if (
        readyToBeWatered(plant.last_water) > (10 + getAverage(plant.skip_history)) &&
        plant.category === 'Cactus & Succulent' &&
        plant.skip_count < 1
      ) {
          let emailToBeSent = plant.email.length ? plant.email : 'plantasynch@gmail.com';

          if(plantsToWater[emailToBeSent]){
            plantsToWater[emailToBeSent].push(plant)

          } else {
            plantsToWater[emailToBeSent] = [ plant ];
          }
        }
      }
    
    return plantsToWater;
  } catch (error) {
    return error;
  }
};

module.exports = { getPlantsToWater };
