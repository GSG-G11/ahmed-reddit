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
};
