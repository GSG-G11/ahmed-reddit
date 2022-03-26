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
} = require('./profileController');

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
const { addPostVotes } = require('./voteController');

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
  addPostVotes,
  deletePost,
  showPost,
  getShowPostPage,
  getLastFivePosts,
  getTopFiveVotedPosts,
  updatePost,
  getShowUserProfile,
};
