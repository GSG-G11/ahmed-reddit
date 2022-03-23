const { handleErrorNotFound, handleErrorServer } = require('./errorController');
const { loginController, getLoginPage } = require('./loginController');
const { registerController, getRegisterPage } = require('./registerController');
const { logoutController } = require('./logoutController');
const { getProfilePage } = require('./ProfileController');

module.exports = {
  handleErrorNotFound,
  handleErrorServer,
  loginController,
  getLoginPage,
  registerController,
  getRegisterPage,
  logoutController,
  getProfilePage,
};
