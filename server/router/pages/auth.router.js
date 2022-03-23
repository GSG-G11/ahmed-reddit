const express = require('express');
const { getLoginPage, getRegisterPage } = require('../../controller');

const auth = express.Router();

auth.get('/login', getLoginPage);
auth.get('/register', getRegisterPage);

module.exports = auth;
