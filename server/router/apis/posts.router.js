const express = require('express');
const { getAllPosts, createPost } = require('../../controller');

const posts = express.Router();

posts.get('/', getAllPosts);
posts.post('/', createPost);

module.exports = posts;
