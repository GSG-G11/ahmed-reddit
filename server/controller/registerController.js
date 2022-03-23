const { join } = require('path');

module.exports = {
  registerController: (_, res) => {
    // create Function To Login
    res.status(200).json({
      status: 200,
      data: { users: 'ahmed' },
      message: 'register Successfully',
    });
  },
  getRegisterPage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(join(__dirname, '..', '..', 'public', 'views', 'register.html'));
    } catch (err) {
      next('SERVER ERROR');
    }
  },
};
