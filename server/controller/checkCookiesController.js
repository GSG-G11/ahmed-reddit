const { CustomError, checkToken } = require('../util');

module.exports = {
  checkCookiesController: ({ cookies }, res, next) => {
    const { accessToken } = cookies;

    if (cookies !== {} && !accessToken)
      throw CustomError('You not Authentication', 400);

    return checkToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
      .then(({ username, id }) =>
        res.status(200).json({ status: 200, username, id }),
      )
      .catch((error) => next(error));
  },
};
