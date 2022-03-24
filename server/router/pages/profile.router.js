const express = require('express');
const { getProfilePage } = require('../../controller');

const auth = express.Router();

auth.get('/', getProfilePage);


module.exports = auth;
