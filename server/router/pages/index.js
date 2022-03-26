const express = require('express');
const { authenticateToken, redirectToDefault } = require('../../middleware');
const auth = require('./auth.router');
const profile = require('./profile.router');
const posts = require('./posts.router');

const pageRoute = express.Router();

pageRoute.use('/auth', redirectToDefault, auth);
pageRoute.use('/profile', profile);
pageRoute.use('/posts', authenticateToken, posts);

module.exports = pageRoute;
