const express = require('express');
const auth = require('./auth.router');
const profile = require('./profile.router');
const posts = require('./posts.router');
const vote = require('./vote.router');
const comments = require('./comments.router');

const apiRoute = express();

apiRoute.use('/', auth);
apiRoute.use('/profile', profile);
apiRoute.use('/posts', posts);
apiRoute.use('/vote', vote);
apiRoute.use('/comments', comments);

module.exports = apiRoute;
