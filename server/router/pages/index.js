const express = require('express');
const { authenticateToken, redirectToDefault } = require('../../middleware');
const auth = require('./auth.router');
const profile = require('./profile.router');

const pageRoute = express.Router();

pageRoute.use('/auth', redirectToDefault, auth);
pageRoute.use('/profile', authenticateToken, profile);

module.exports = pageRoute;
