const express = require('express');
const {
  loginController,
  registerController,
  logoutController
} = require('../../controller');


const auth = express.Router();

auth.post('/login', loginController);
auth.post('/register', registerController);

auth.get('/logout', logoutController);


module.exports = auth;
