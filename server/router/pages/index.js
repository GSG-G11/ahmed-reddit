const express = require('express');
const auth = require('./auth.router');

const pageRoute = express();

pageRoute.use('/', auth);

module.exports = pageRoute;
