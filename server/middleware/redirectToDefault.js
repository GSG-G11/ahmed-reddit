const { checkToken } = require('../util');

module.exports = {
  // inverse protected middleware
  redirectToDefault: (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next();
    }

    return checkToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
      .then(({ id, username }) => {
        req.body.id = id;
        req.body.username = username;
        res.status(302).redirect('/');
      })
      .catch((error) => next(error));
  },
};
