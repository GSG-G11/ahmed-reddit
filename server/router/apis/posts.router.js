const express = require('express');
const {
  getAllPosts,
  createPost,
  deletePost,
  showPost,
} = require('../../controller');

const posts = express.Router();

posts.get('/', getAllPosts);
posts.post('/', createPost);
posts.delete('/', deletePost);

posts.get('/:postId/show', showPost);

module.exports = posts;
