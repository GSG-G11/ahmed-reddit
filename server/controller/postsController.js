/* eslint-disable prefer-destructuring */
const { join } = require('path');
const {
  getPostsQuery,
  createPostQuery,
  deletePostQuery,
  showPostQuery,
} = require('../database/queries');
const { CustomError } = require('../util');

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
      .then((post) => {
        if (post.rowCount) {
          return res.status(200).json({ status: 200, data: post.rows });
        }
        return res.status(200).json({
          status: 200,
          message: 'Sorry, Not Found Any Post',
        });
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

  deletePost: ({ body }, res, next) => {
    const { id: userId, postId } = body;

    deletePostQuery(postId, userId)
      .then((post) => {
        if (post.rowCount) {
          return res.status(200).json({
            status: 200,
            message: 'Delete Your post Successfully',
            data: post.rows[0],
          });
        }
        throw CustomError('Sorry, this post is Not Exist', 400);
      })
      .catch((error) => next(error));
  },

  getShowPostPage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(
          join(__dirname, '..', '..', 'public', 'views', 'single-page.html'),
        );
    } catch (err) {
      next('SERVER ERROR');
    }
  },

  showPost: ({ params }, res, next) => {
    const { postId } = params;

    showPostQuery(postId)
      .then((post) => {
        if (post.rowCount) {
          return res.status(200).json({
            status: 200,
            data: post.rows[0],
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'Sorry, this post is Not Exist',
        });
      })
      .catch((error) => next(error));
  },
};
