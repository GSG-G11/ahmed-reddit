const express = require('express');
const {
  getAllPosts,
  createPost,
  deletePost,
  showPost,
  getLastFivePosts,
  getTopFiveVotedPosts,
  updatePost,
  searchPosts
} = require('../../controller');
const { authenticateToken } = require('../../middleware');

const posts = express.Router();


posts.get('/:postId/show', showPost);
posts.get('/', getAllPosts);
posts.get('/latest', getLastFivePosts);
posts.get('/top-voted', getTopFiveVotedPosts);
posts.get('/search', searchPosts);

// ----------------------- protected route ----------------
posts.use(authenticateToken);
posts.post('/', createPost);
posts.put('/', updatePost);
posts.delete('/', deletePost);


module.exports = posts;
