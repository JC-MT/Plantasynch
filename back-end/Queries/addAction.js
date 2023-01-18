const db = require('../db/dbConfig');

const addAction = async (action, id) => {

    try {
        const previousActions = await db.one(
          'SELECT actions FROM garden WHERE id=$1',
          [id]
        );

        let actions = previousActions.actions || [];
        const newAction = { date: "2023/01/17", action: action, action_number: actions.length + 1}
        actions.push(newAction)
    
        if(actions.includes(newAction)){
            try {
                const updatedActions = await db.one(
                    'UPDATE garden SET actions=$1:json WHERE id=$2 RETURNING *',
                    [actions, id]
                );
                return updatedActions;
            } catch (error){
                console.log(error.message);
                return error;
            }
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

module.exports = { addAction };