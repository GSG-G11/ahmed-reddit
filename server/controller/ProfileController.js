const { join } = require('path');
const { getUserProfileQuery } = require('../database/queries');

module.exports = {
  getProfilePage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(
          join(__dirname, '..', '..', 'public', 'views', 'profile.html'),
        );
    } catch (err) {
      next('SERVER ERROR');
    }
  },
  profileController: ({ body }, res, next) => {
    console.log(body.id, body.username);
    // Create Update profile
  },
  getUserProfile: ({ body }, res, next) => {
    getUserProfileQuery(body.id)
      .then((user) => {
        res.status(200).json({ status: 200, data: user.rows[0] });
      })
      .catch((error) => next(error));
  },
};
