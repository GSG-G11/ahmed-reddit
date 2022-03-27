const express = require('express');
const { getPostsPage, getShowPostPage } = require('../../controller');
const { authenticateToken } = require('../../middleware');

const posts = express.Router();

posts.get('/', authenticateToken, getPostsPage);
posts.get('/:postId/show', getShowPostPage);

module.exports = posts;
