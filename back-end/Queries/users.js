const db = require('../db/dbConfig');

//INDEX
const getAllUsers = async () => {
  try {
    const allUsers = await db.any('SELECT * FROM platasynch_users');
    return allUsers;
  } catch (error) {
    return error;
  }
};

//SHOW
const getUser = async (id) => {
    try {
      const user = await db.any('SELECT * FROM platasynch_users WHERE id=$1', id);
      return user;
    } catch (error) {
      return error;
    }
  };
  
  //CREATE
  const createUser = async (user) => {
    const {
        name, 
        password, 
        email, 
    } = user;
    try {
      const newUser = await db.one(
        'INSERT INTO platasynch_users ( name, password, email) VALUES ($1, $2, $3) RETURNING *',
        [
            name, 
            password, 
            email, 
        ]
      );
      return newUser;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  module.exports = {
    getAllUsers,
    getUser,
    createUser
  }