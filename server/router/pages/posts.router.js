const express = require('express');
const { getPostsPage } = require('../../controller');

const posts = express.Router();

posts.get('/', getPostsPage);

module.exports = posts;
