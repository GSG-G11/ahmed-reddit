/* eslint-disable prefer-destructuring */
const { join } = require('path');
const {
  getPostsQuery,
  createPostQuery,
  deletePostQuery,
  showPostQuery,
  getUserProfileQuery,
  getLastFivePostsQuery,
  getTopFiveVotedPostsQuery,
  updatePostQuery,
} = require('../database/queries');
const {
  CustomError,
  createPostValidationSchema,
  updatePostValidationSchema,
} = require('../util');

let newPost;

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
          data: [],
        });
      })
      .catch((error) => next(error));
  },

  createPost: ({ body }, res, next) => {
    const { id, title, content, urlImage, createdAt } = body;
    // Server Side Validation
    createPostValidationSchema
      .validateAsync(
        {
          title,
          content,
          createdAt,
          urlImage
        },
        { abortEarly: false },
      )
      .then(() => createPostQuery(id, title, content, urlImage, createdAt))
      .then((post) => {
        newPost = post.rows[0];
        return getUserProfileQuery(newPost.user_id);
      })
      .then((user) => {
        const { username, url_image: linkImage } = user.rows[0];
        newPost.username = username;
        newPost.urlImage = linkImage;
        res.status(200).json({
          status: 200,
          message: 'Create Post Successfully 😉',
          data: newPost,
        });
      })
      .catch((error) => {
        // Handle Error
        if (error.name === 'ValidationError') {
          const messages = error.details.map((e) => e.message);
          next(CustomError('Validation Error', 400, messages));
        } else {
          next(error);
        }
      });
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
          data: [],
        });
      })
      .catch((error) => next(error));
  },

  getLastFivePosts: (_, res, next) => {
    getLastFivePostsQuery()
      .then((post) => {
        if (post.rowCount) {
          return res.status(200).json({ status: 200, data: post.rows });
        }
        return res.status(200).json({
          status: 200,
          message: 'Sorry, Not Found Any Post',
          data: [],
        });
      })
      .catch((error) => next(error));
  },

  getTopFiveVotedPosts: (_, res, next) => {
    getTopFiveVotedPostsQuery()
      .then((post) => {
        if (post.rowCount) {
          return res.status(200).json({ status: 200, data: post.rows });
        }
        return res.status(200).json({
          status: 200,
          message: 'Sorry, Not Found Any Post',
          data: [],
        });
      })
      .catch((error) => next(error));
  },

  updatePost: ({ body }, res, next) => {
    const { postID, id: userId, title, content, urlImage } = body;

    updatePostValidationSchema
      .validateAsync(
        {
          postID,
          title,
          content,
          urlImage
        },
        { abortEarly: false },
      )
      .then(() => updatePostQuery(postID, userId, title, content, urlImage))
      .then((post) => {
        if (post.rowCount) {
          return res.status(200).json({
            status: 200,
            message: 'Post Updated Successfully',
            data: post.rows,
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'Sorry, this post is Not Exist',
          data: [],
        });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          const messages = error.details.map((e) => e.message);
          next(CustomError('Validation Error', 400, messages));
        } else {
          next(error);
        }
      });
  },
};
