const { join } = require('path');

module.exports = {
  getProfilePage: ({ body }, res, next) => {
    try {
      console.log(body.id, body.username);
      res
        .status(301)
        .sendFile(
          join(__dirname, '..', '..', 'public', 'views', 'profile.html'),
        );
    } catch (err) {
      next('SERVER ERROR');
    }
  },
};
