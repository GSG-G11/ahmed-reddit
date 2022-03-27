const express = require('express');
const { getProfilePage, getShowProfilePage } = require('../../controller');
const { authenticateToken } = require('../../middleware');

const auth = express.Router();

auth.get('/', authenticateToken, getProfilePage);
auth.get('/user/:userId/show', getShowProfilePage);

module.exports = auth;
