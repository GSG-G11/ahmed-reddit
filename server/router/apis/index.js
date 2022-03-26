const express = require('express');
const auth = require('./auth.router');
const profile = require('./profile.router');
const posts = require('./posts.router');
const vote = require('./vote.router');
const { authenticateToken } = require('../../middleware');

const apiRoute = express();

apiRoute.use('/', auth);
apiRoute.use('/profile', profile);
apiRoute.use('/posts', authenticateToken, posts);
apiRoute.use('/vote', authenticateToken, vote);

module.exports = apiRoute;
