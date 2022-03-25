/* eslint-disable prefer-destructuring */
const { join } = require('path');
const { getPostsQuery, createPostQuery } = require('../database/queries');

module.exports = {
  getPostsPage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(join(__dirname, '..', '..', 'public', 'views', 'posts.html'));
    } catch (err) {
      next('SERVER ERROR');
    }
  },

  getAllPosts: (_, res, next) => {
    getPostsQuery()
      .then((user) => {
        res.status(200).json({ status: 200, data: user.rows });
      })
      .catch((error) => next(error));
  },

  createPost: ({ body }, res, next) => {
    const { id, title, content, urlImage, createdAt } = body;

    createPostQuery(id, title, content, urlImage, createdAt)
      .then((user) => {
        res.status(200).json({ status: 200, data: user.rows });
      })
      .catch((error) => next(error));
  },
};
