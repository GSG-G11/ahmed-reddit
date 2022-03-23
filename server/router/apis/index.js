const express = require('express');
const auth = require('./auth.router');

const apiRoute = express();

apiRoute.use('/', auth);

module.exports = apiRoute;
