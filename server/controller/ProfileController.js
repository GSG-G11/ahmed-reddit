const { join } = require('path');
const {
  getUserProfileQuery,
  updateUserProfileQuery,
} = require('../database/queries');
const { profileValidationSchema, CustomError } = require('../util');

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
    // console.log(body.id);
    const { id, username, age, url_image: urlImage, bio } = body;
    // Create Update profile

    // Validation Server Side
    profileValidationSchema
      .validateAsync(
        {
          username,
          age,
          urlImage,
          bio,
        },
        { abortEarly: false },
      )
      // update profile
      .then(() => updateUserProfileQuery(id, username, age, urlImage, bio))
      .then((userUpdated) =>
        res.status(200).json({
          status: 200,
          message: 'Update Your Profile Successfully',
          data: userUpdated.rows[0],
        }),
      )
      // Handle Error
      .catch((error) => {
        if (error.name === 'ValidationError') {
          const messages = error.details.map((e) => e.message);
          next(CustomError('Validation Error', 400, messages));
        }
        next(error);
      });
  },
  
  getUserProfile: ({ body }, res, next) => {
    getUserProfileQuery(body.id)
      .then((user) => {
        res.status(200).json({ status: 200, data: user.rows[0] });
      })
      .catch((error) => next(error));
  },
};
