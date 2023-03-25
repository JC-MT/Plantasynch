const db = require('../db/dbConfig');
const dayjs = require('dayjs')

//UPDATE
const updateWater = async (id) => {
  const now = dayjs().format('YYYY-MM-DD')

  try {
    const updateWater = await db.one(
      'UPDATE garden SET last_water=$1 WHERE id=$2 RETURNING *',
      [now, id]
    );
    return updateWater;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

module.exports = { updateWater };
