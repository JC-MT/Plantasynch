const db = require('../db/dbConfig');

const updateSkipHistory = async (id) => {

  try {
    const skipInformation = await db.one(
      'SELECT skip_count, skip_history FROM garden WHERE id=$1',
      [id]
    );

    let { skip_count, skip_history } = skipInformation;
    const resetSkipCount = 0

    if(!skip_history) skip_history = []

    if(skip_count > 0){
        let newHistory = skip_history.filter((skip) => skip > 0);

        newHistory.push(skip_count)

        try {
            const newSkipCountAndHistory = await db.one(
                'UPDATE garden SET skip_count=$1, skip_history=$2 WHERE id=$3 RETURNING *',
                [resetSkipCount, newHistory, id]
            );
            return newSkipCountAndHistory;
        } catch (error){
            console.log(error.message);
            return error;
        }
    }
    return skipInformation;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

module.exports = { updateSkipHistory };