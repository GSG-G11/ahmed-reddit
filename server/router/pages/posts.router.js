const express = require('express');
const { getPostsPage, getShowPostPage } = require('../../controller');

const posts = express.Router();

posts.get('/', getPostsPage);
posts.get('/:postId/show', getShowPostPage);

module.exports = posts;
