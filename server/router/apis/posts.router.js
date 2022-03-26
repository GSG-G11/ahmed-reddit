const express = require('express');
const {
  getAllPosts,
  createPost,
  deletePost,
  showPost,
  getLastFivePosts,
  getTopFiveVotedPosts,
} = require('../../controller');

const posts = express.Router();

posts.get('/', getAllPosts);
posts.post('/', createPost);
posts.delete('/', deletePost);

posts.get('/:postId/show', showPost);
posts.get('/latest', getLastFivePosts);
posts.get('/top-voted', getTopFiveVotedPosts);

module.exports = posts;
