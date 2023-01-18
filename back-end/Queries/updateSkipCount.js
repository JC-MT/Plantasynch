const db = require('../db/dbConfig');

const updateSkipCount = async (count, id) => {
    const { skip_count } = count
    const newCount = skip_count + 1

    try {
        const updateCount = await db.one(
            'UPDATE garden SET skip_count=$1 WHERE id=$2 RETURNING *',
            [newCount, id]
        );

        return updateCount;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

module.exports = { updateSkipCount };