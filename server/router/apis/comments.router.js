const express = require('express');
const {
  getAllCommentsPost,
  createCommentsPost,
  deleteCommentsPost,
} = require('../../controller');
const { authenticateToken } = require('../../middleware');

const comments = express.Router();

comments.get('/:postId/show', getAllCommentsPost);

comments.use(authenticateToken);
comments.post('/', createCommentsPost);
comments.delete('/', deleteCommentsPost);

module.exports = comments;
