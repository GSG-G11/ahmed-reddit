const { join } = require('path');
const { checkExistUserQuery } = require('../database/queries');
const {
  loginValidationSchema,
  CustomError,
  comparePasswords,
  generateToken,
} = require('../util');

module.exports = {
  loginController: ({ body }, res, next) => {
    // create Function To Login
    // get request body
    const { email, password } = body;
    let id;
    let username;

    // Server Side Validation
    loginValidationSchema
      .validateAsync(
        {
          email,
          password,
        },
        { abortEarly: false },
      )
      // Check is Email is Exist
      .then(() => checkExistUserQuery(email))
      .then((data) => {
        if (!data.rowCount) {
          //  This email is already in the database.
          throw CustomError('Sorry! This email not exist please sign up', 400);
        }
        // hash password before store it in database
        id = data.rows[0].id;
        username = data.rows[0].username;
        return comparePasswords(password.trim(), data.rows[0].password);
      })
      .then((isExists) => {
        if (!isExists) {
          throw CustomError(
            'Sorry! The information provided is inaccurate.',
            400,
          );
        }
        // create new Token
        return generateToken(
          { id, username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '24h' },
        );
      })
      // End response
      .then((token) =>
        res.status(200).cookie('accessToken', token).json({
          status: 200,
          message: 'login successfully',
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
