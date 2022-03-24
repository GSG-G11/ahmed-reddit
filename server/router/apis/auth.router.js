const express = require('express');
const {
  loginController,
  registerController,
  logoutController,
  checkCookiesController
} = require('../../controller');
const { redirectToDefault, authenticateToken } = require('../../middleware');

const auth = express.Router();

auth.post('/login', redirectToDefault, loginController);
auth.post('/register', redirectToDefault, registerController);

auth.get('/logout', authenticateToken, logoutController);


auth.get('/check-cookies',checkCookiesController);

module.exports = auth;
