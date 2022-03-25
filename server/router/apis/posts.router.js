const express = require('express');
const { getAllPosts, createPost, deletePost } = require('../../controller');

const posts = express.Router();

posts.get('/', getAllPosts);
posts.post('/', createPost);
posts.delete('/', deletePost);

module.exports = posts;
