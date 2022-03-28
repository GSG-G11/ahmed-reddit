const express = require('express');
const {
  checkUserVotes,
  getPostVotes,
  postVoteUp,
  postVoteDown,
} = require('../../controller');
const { authenticateToken } = require('../../middleware');

const vote = express.Router();

vote.get('/post/:postId', getPostVotes);

vote.get('/post/:postId/check', authenticateToken, checkUserVotes);
vote.post('/up', authenticateToken, postVoteUp);
vote.post('/down', authenticateToken, postVoteDown);

module.exports = vote;
