/* eslint-disable prefer-destructuring */
const {
  getCommentsPostQuery,
  createPostCommentQuery,
  getUserProfileQuery,
  deleteCommentsPostQuery,
} = require('../database/queries');
const { CustomError, createCommentValidationSchema } = require('../util');

let newComment;

module.exports = {
  getAllCommentsPost: ({ params }, res, next) => {
    const { postId } = params;
    getCommentsPostQuery(postId)
      .then((comments) => {
        if (comments.rowCount) {
          res.status(200).json({ status: 200, data: comments.rows });
        } else {
          res.status(200).json({
            status: 200,
            message: "Sorry This Post has't comments! 😢",
            data: [],
          });
        }
      })
      .catch((error) => next(error));
  },
  createCommentsPost: ({ body }, res, next) => {
    const { id: userId, content, postID } = body;

    createCommentValidationSchema
      .validateAsync({ postID, content }, { abortEarly: false })
      .then(() => createPostCommentQuery(postID, userId, content))
      .then((post) => {
        newComment = post.rows[0];
        return getUserProfileQuery(newComment.user_id);
      })
      .then((user) => {
        const { username, url_image: linkImage } = user.rows[0];
        newComment.username = username;
        newComment.urlImage = linkImage;
        res.status(200).json({
          status: 200,
          message: 'Create Comments Successfully 😉',
          data: newComment,
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

  deleteCommentsPost: ({ body }, res, next) => {
    const { id: userId, commentId } = body;

    deleteCommentsPostQuery(commentId, userId)
      .then((commentsPost) => {
        if (commentsPost.rowCount) {
          return res.status(200).json({
            status: 200,
            message: 'Delete Your Comment Successfully',
            data: commentsPost.rows[0],
          });
        }
        throw CustomError('Sorry, this Comment is Not Exist', 400);
      })
      .catch((error) => next(error));
  },
};
