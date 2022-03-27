const express = require('express');
const { addPostVotes ,checkUserVotes,getPostVotes} = require('../../controller');

const vote = express.Router();

vote.get('/post/:postId', getPostVotes);

vote.post('/', addPostVotes);
vote.get('/post/:postId/check', checkUserVotes);


module.exports = vote;
