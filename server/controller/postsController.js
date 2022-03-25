/* eslint-disable prefer-destructuring */
const { join } = require('path');
const {
  getPostsQuery,
  createPostQuery,
  deletePostQuery,
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
};
