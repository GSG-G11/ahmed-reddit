const express = require('express');
const auth = require('./auth.router');
const profile = require('./profile.router');
const { authenticateToken } = require('../../middleware');

const apiRoute = express();

apiRoute.use('/', auth);
apiRoute.use('/profile', authenticateToken, profile);

module.exports = apiRoute;
