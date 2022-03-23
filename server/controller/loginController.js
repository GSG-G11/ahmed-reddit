const { join } = require('path');

module.exports = {
  loginController: (_, res) => {
    // create Function To Login
    res.status(200).json({
      status: 200,
      data: { users: 'ahmed' },
      message: 'login Successfully',
    });
  },
  getLoginPage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(join(__dirname, '..', '..', 'public', 'views', 'login.html'));
    } catch (err) {
      next('SERVER ERROR');
    }
  },
};
