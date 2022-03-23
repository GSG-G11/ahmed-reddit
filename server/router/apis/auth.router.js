const express = require('express');
const {
  loginController,
} = require('../../controller');


const auth = express.Router();

auth.post('/login', loginController);


module.exports = auth;
