const express = require('express');
const {
  loginController,
  registerController
} = require('../../controller');


const auth = express.Router();

auth.post('/login', loginController);
auth.post('/register', registerController);


module.exports = auth;
