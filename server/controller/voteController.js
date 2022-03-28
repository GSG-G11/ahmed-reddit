const {
  checkUserHasVoteQuery,
  addPostVoteQuery,
  updatePostVoteQuery,
  getPostVoteQuery,
} = require('../database/queries');

const VOTE_UP = 1;
const VOTE_DOWN = -1;

module.exports = {
  getPostVotes: ({ params }, res, next) => {
    const { postId } = params;
    // first check if user has votes for this post

    getPostVoteQuery(postId)
      .then(({ rowCount, rows }) => {
        if (rowCount) {
          res.status(200).json({
            status: 200,
            message: 'your Get voted successfully',
            data: rows[0],
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Sorry has't votes for this post",
            data: rows,
          });
        }
      })
      .catch((error) => next(error));
    // .catch(console.log);
  },
  checkUserVotes: ({ params, body }, res, next) => {
    const { postId } = params;
    const { id: userId } = body;
    // first check if user has votes for this post

    checkUserHasVoteQuery(userId, postId)
      .then(({ rowCount, rows }) => {
        if (rowCount) {
          res.status(200).json({
            status: 200,
            message: 'Get voted successfully',
            data: rows[0],
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Sorry has't votes for this post",
            data: rows,
          });
        }
      })
      .catch((error) => next(error));
    // .catch(console.log);
  },

  postVoteUp: ({ body }, res, next) => {
    const { id: userId, postId } = body;
    // first check if user has votes for this post

    checkUserHasVoteQuery(userId, postId)
      .then((data) => {
        if (data.rowCount) {
          // if true, update value
          return updatePostVoteQuery(data.rows[0].id, userId, postId, VOTE_UP);
        }
        // if false create new vote
        return addPostVoteQuery(postId, userId, VOTE_UP);
      })
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: 'your voted Up Saved successfully',
          data: data.rows[0],
        });
      })
      .catch((error) => next(error));
  },
  postVoteDown: ({ body }, res, next) => {
    const { id: userId, postId } = body;
    // first check if user has votes for this post
    checkUserHasVoteQuery(userId, postId)
      .then((data) => {
        if (data.rowCount) {
          // if true, update value
          return updatePostVoteQuery(
            data.rows[0].id,
            userId,
            postId,
            VOTE_DOWN,
          );
        }
        // if false create new vote
        return addPostVoteQuery(postId, userId, VOTE_DOWN);
      })
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: 'your voted Down Saved successfully',
          data: data.rows[0],
        });
      })
      .catch((error) => next(error));
  },
};
