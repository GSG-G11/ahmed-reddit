const { handleErrorNotFound, handleErrorServer } = require('./errorController');
const { loginController, getLoginPage } = require('./loginController');
const { registerController, getRegisterPage } = require('./registerController');
const {
  profileController,
  getUserProfile,
  getProfilePage,
  passwordUpdate,
  getShowProfilePage,
  getShowUserProfile,
} = require('./ProfileController');

const { logoutController } = require('./logoutController');

const { checkCookiesController } = require('./checkCookiesController');
const {
  getAllPosts,
  getPostsPage,
  createPost,
  deletePost,
  showPost,
  getShowPostPage,
  getLastFivePosts,
  getTopFiveVotedPosts,
  updatePost,
} = require('./postsController');
const {
  checkUserVotes,
  getPostVotes,
  postVoteUp,
  postVoteDown,
} = require('./voteController');

const {
  getAllCommentsPost,
  createCommentsPost,
  deleteCommentsPost,
} = require('./CommentController');

module.exports = {
  handleErrorNotFound,
  handleErrorServer,
  loginController,
  getLoginPage,
  registerController,
  getRegisterPage,
  logoutController,
  getProfilePage,
  profileController,
  getUserProfile,
  getShowProfilePage,
  passwordUpdate,
  checkCookiesController,
  getAllPosts,
  getPostsPage,
  createPost,
  checkUserVotes,
  getPostVotes,
  deletePost,
  showPost,
  getShowPostPage,
  getLastFivePosts,
  getTopFiveVotedPosts,
  updatePost,
  getShowUserProfile,
  getAllCommentsPost,
  createCommentsPost,
  deleteCommentsPost,
  postVoteUp,
  postVoteDown,
};
