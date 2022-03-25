const express = require('express');
const { getPostsPage, getShowPostPage } = require('../../controller');

const posts = express.Router();

posts.get('/', getPostsPage);
posts.get('/show', getShowPostPage);

module.exports = posts;
