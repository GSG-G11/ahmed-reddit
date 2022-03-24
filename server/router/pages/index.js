const express = require('express');
const { authenticateToken, redirectToDefault } = require('../../middleware');
const auth = require('./auth.router');
const profile = require('./profile.router');

const pageRoute = express();

pageRoute.use('/', redirectToDefault, auth);
pageRoute.use('/', authenticateToken, profile);

module.exports = pageRoute;
