const db = require('../db/dbConfig');

//UPDATE
const updateWater = async (id) => {
  const newDay = new Date();
  let month = newDay.getMonth();
  let date = newDay.getDate();

  const formatedDay = `${newDay.getFullYear()}/${
    month >= 9 ? month + 1 : `0${month + 1}`
  }/${date >= 9 ? date : `0${date}`}`;

  console.log(formatedDay);
  try {
    const updateWater = await db.one(
      'UPDATE garden SET last_water=$1 WHERE id=$2 RETURNING *',
      [formatedDay, id]
    );
    return updateWater;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

module.exports = { updateWater };
