const express = require('express');
const { addPostVotes } = require('../../controller');

const vote = express.Router();

vote.post('/', addPostVotes);


module.exports = vote;
