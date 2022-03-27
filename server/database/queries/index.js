const checkExistUserQuery = require('./checkExistUserQuery');
const createUserQuery = require('./createUserQuery');
const getUserProfileQuery = require('./getUserProfileQuery');
const updateUserProfileQuery = require('./updateUserProfileQuery');
const getUserPasswordQuery = require('./getUserPasswordQuery');
const updateUserPasswordQuery = require('./updateUserPasswordQuery');
const getPostsQuery = require('./getPostsQuery');
const createPostQuery = require('./createPostQuery');
const addPostVoteQuery = require('./addPostVoteQuery');
const checkUserHasVoteQuery = require('./checkUserHasVoteQuery');
const updatePostVoteQuery = require('./updatePostVoteQuery');
const deletePostQuery = require('./deletePostQuery');
const showPostQuery = require('./showPostQuery');
const getLastFivePostsQuery = require('./getLastFivePostsQuery');
const getTopFiveVotedPostsQuery = require('./getTopFiveVotedPostsQuery');
const updatePostQuery = require('./updatePostQuery');
const getCommentsPostQuery = require('./getCommentsPostQuery');
const createPostCommentQuery = require('./createPostCommentQuery');
const deleteCommentsPostQuery = require('./deleteCommentsPostQuery');

module.exports = {
  checkExistUserQuery,
  createUserQuery,
  getUserProfileQuery,
  updateUserProfileQuery,
  getUserPasswordQuery,
  updateUserPasswordQuery,
  getPostsQuery,
  createPostQuery,
  addPostVoteQuery,
  checkUserHasVoteQuery,
  updatePostVoteQuery,
  deletePostQuery,
  showPostQuery,
  getLastFivePostsQuery,
  getTopFiveVotedPostsQuery,
  updatePostQuery,
  getCommentsPostQuery,
  createPostCommentQuery,
  deleteCommentsPostQuery,
};
