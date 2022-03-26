/* eslint-disable prefer-destructuring */
const { join } = require('path');
const {
  getUserProfileQuery,
  updateUserProfileQuery,
  getUserPasswordQuery,
  updateUserPasswordQuery,
} = require('../database/queries');
const {
  profileValidationSchema,
  updatePasswordValidationSchema,
  CustomError,
  comparePasswords,
  hashPassword,
  generateToken,
} = require('../util');

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

  getShowProfilePage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(
          join(__dirname, '..', '..', 'public', 'views', 'show-profile.html'),
        );
    } catch (err) {
      next('SERVER ERROR');
    }
  },

  profileController: ({ body }, res, next) => {
    // console.log(body.id);
    const { id, username, age, url_image: urlImage, bio } = body;
    let newInformationUser;
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
      // create new Token
      .then((data) => {
        newInformationUser = data.rows[0];
        return generateToken(
          { id: data.rows[0].id, username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '24h' },
        );
      })
      .then((token) =>
        res.status(200).cookie('accessToken', token).json({
          status: 200,
          message: 'Update Your Profile Successfully',
          data: newInformationUser,
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

  passwordUpdate: ({ body }, res, next) => {
    // console.log(body.id);
    const { id, currentPassword, password, confirmPassword } = body;
    // Create Update profile

    // Validation Server Side
    updatePasswordValidationSchema
      .validateAsync(
        {
          currentPassword,
          password,
          confirmPassword,
        },
        { abortEarly: false },
      )
      // Check user found
      // Check is Email is Exist
      .then(() => getUserPasswordQuery(id))
      .then((data) => {
        if (!data.rowCount) {
          throw CustomError('Sorry! Something was wrong', 400);
        }
        // hash password before store it in database

        return comparePasswords(currentPassword.trim(), data.rows[0].password);
      })
      .then((isExists) => {
        if (!isExists) {
          throw CustomError('Sorry! Your Current Password is inaccurate', 400);
        }

        // hash password before store it in database
        return hashPassword(password.trim());
      })
      // update profile
      .then((passwordHashed) => updateUserPasswordQuery(id, passwordHashed))
      .then((user) =>
        res.status(200).json({
          status: 200,
          message: 'Update Your Password Successfully',
          data: user.rows[0],
        }),
      )
      // Handle Error
      .catch((error) => {
        if (error.name === 'ValidationError') {
          const messages = error.details.map((e) => e.message);
          next(CustomError('Validation Error', 400, messages));
        } else {
          next(error);
        }
      });
  },

  getUserProfile: ({ body }, res, next) => {
    const { id } = body;

    getUserProfileQuery(id)
      .then((user) => {
        if (user.rowCount) {
          res.status(200).json({ status: 200, data: user.rows[0] });
        } else {
          res
            .status(200)
            .json({
              status: 200,
              message: 'Sorry This User is not Exist!',
              data: {},
            });
        }
      })
      .catch((error) => next(error));
  },

  getShowUserProfile: ({ params }, res, next) => {
    const { userId } = params;
    getUserProfileQuery(userId)
      .then((user) => {
        if (user.rowCount) {
          res.status(200).json({ status: 200, data: user.rows[0] });
        } else {
          res
            .status(200)
            .json({
              status: 200,
              message: 'Sorry This User is not Exist!',
              data: [],
            });
        }
      })
      .catch((error) => next(error));
  },
};
