const express = require('express');
const {
  getLoginPage,
} = require('../../controller');


const auth = express.Router();

auth.get('/login', getLoginPage);


module.exports = auth;
