// ===========TODO================

// const db = require('../db/dbConfig');

// //INDEX
// const getAllUsers = async () => {
//     try {
//       const allUsers = await db.any('SELECT * FROM pg_user;');
//       console.log(allUsers)
//       return allUsers;
//     } catch (error) {
//         console.log(error)
//       return error;
//     }
//   };
//   const createDb = async (username) => {
//     try {
//     const database = await db.one(
//     `CREATE DATABASE ${username}db OWNER ${username};`)
//     console.log('maybe', database)
//     return database
//     } catch(err){
//         return err
//     }
// }

// const createTable = async (username) => {
//     try {
//     const table = await db.one(
//         `CREATE TABLE ${username}db (
//             id SERIAL PRIMARY KEY,
//             name TEXT,
//             image TEXT,
//             origin TEXT,
//             category TEXT,
//             ideal_light TEXT,
//             ideal_watering TEXT,
//             last_water TEXT,
//             is_healthy BOOLEAN,
//             email TEXT
//         );`)
//     console.log('some', table)
//     return table
//     } catch(err){
//         return err
//     }
// }

// //CREATE
// const createUser = async (user) => {
//     const {
//       username,
//       password,
//     } = user;
//     try {
//       const newUser = await db.one(
//         `CREATE USER ${username} WITH PASSWORD '${password}' CREATEDB;`)
//         createDb(username)
//         createTable(username)
//         console.log('here', newUser)
//       return newUser;
//     } catch (error) {
//       console.log(error.message);
//       return error;
//     }
//   };

//   module.exports = {
//     getAllUsers,
//     createUser
//   }