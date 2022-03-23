const express = require('express');
const { getProfilePage } = require('../../controller');

const auth = express.Router();

auth.get('/profile', getProfilePage);


module.exports = auth;
