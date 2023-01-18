const express = require('express');
const users = express.Router();

const { getUser, createUser} = require('../Queries/users')

// SHOW
users.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
  
    if (user[0]) {
      res.status(200).json({ success: true, payload: user[0] });
    } else {
      res
        .status(404)
        .json({
          success: false,
          payload: `User with id:'${id}' could not be found`
        });
    }
  });

  //CREATE
users.post('/', async (req, res) => {
    const newUser = await createUser(req.body);
    if (newUser) {
      res.status(200).json({ success: true, payload: newUser });
    } else {
      res
        .status(404)
        .json({ success: false, payload: 'User could not be created' });
    }
  });


module.exports = users;