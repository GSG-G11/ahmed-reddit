const express = require('express');
const {  redirectToDefault } = require('../../middleware');
const auth = require('./auth.router');
const profile = require('./profile.router');
const posts = require('./posts.router');

const pageRoute = express.Router();

pageRoute.use('/auth', redirectToDefault, auth);
pageRoute.use('/profile', profile);
pageRoute.use('/posts', posts);

module.exports = pageRoute;
