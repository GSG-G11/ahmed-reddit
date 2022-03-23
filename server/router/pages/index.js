const express = require('express');
const { authenticateToken } = require('../../middleware');
const auth = require('./auth.router');
const profile = require('./profile.router');

const pageRoute = express();

pageRoute.use('/', auth);
pageRoute.use('/', authenticateToken, profile);

module.exports = pageRoute;
