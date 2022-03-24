const { handleErrorNotFound, handleErrorServer } = require('./errorController');
const { loginController, getLoginPage } = require('./loginController');
const { registerController, getRegisterPage } = require('./registerController');
const {
  profileController,
  getUserProfile,
  getProfilePage,
  passwordUpdate
} = require('./profileController');
const { logoutController } = require('./logoutController');

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
  passwordUpdate
};
