const {
  checkUserHasVoteQuery,
  addPostVoteQuery,
  updatePostVoteQuery,
} = require('../database/queries');

module.exports = {
  addPostVotes: ({ body }, res, next) => {
    const { id: userId, postId, vote } = body;
    // first check if user has votes for this post

    checkUserHasVoteQuery(userId, postId)
      .then((data) => {
        if (data.rowCount) {
          // if true, update value
          return updatePostVoteQuery(data.rows[0].id, userId, postId, vote);
        }
        // if false create new vote
        return addPostVoteQuery(postId, userId, vote);
      })
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: 'your voted Saved successfully',
          data: data.rows[0],
        });
      })
      .catch((error) => next(error));
  },
};
