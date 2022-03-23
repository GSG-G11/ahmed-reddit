const { join } = require('path');
const {
  registerValidationSchema,
  CustomError,
  hashPassword,
  generateToken,
} = require('../util');
const { checkExistUserQuery, createUserQuery } = require('../database/queries');

module.exports = {
  registerController: ({ body }, res, next) => {
    // get request body
    const { username, email, password, confirmPassword } = body;

    // Server Side Validation
    registerValidationSchema
      .validateAsync(
        {
          username,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false },
      )
      // Check is Email is unique
      .then(() => checkExistUserQuery(email))
      .then((data) => {
        if (data.rowCount) {
          //  This email is already in the database.
          throw CustomError('Sorry! This email is already in use', 400);
        }
        // hash password before store it in database
        return hashPassword(password.trim());
      })
      // create new User Query
      .then((passwordHashed) =>
        createUserQuery(username, email, passwordHashed),
      )
      // create new Token
      .then((data) =>
        generateToken(
          { id: data.rows[0].id, username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '24h' },
        ),
      )
      // End response
      .then((token) =>
        res.status(200).cookie('accessToken', token).json({
          status: 200,
          message: 'Register successfully',
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
  getRegisterPage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(
          join(__dirname, '..', '..', 'public', 'views', 'register.html'),
        );
    } catch (err) {
      next('SERVER ERROR');
    }
  },
};
