const { handleErrorNotFound, handleErrorServer } = require('./errorController');
const { loginController, getLoginPage } = require('./loginController');

module.exports = {
  handleErrorNotFound,
  handleErrorServer,
  loginController,
  getLoginPage,
};
