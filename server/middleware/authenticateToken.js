const { checkToken } = require('../util');

module.exports = {
  // protected middleware
  authenticateToken: (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(302).redirect('/auth/login');

    return checkToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
      .then(({ id }) => {
        req.body.id = id;
        next();
      })
      .catch((error) => next(error));
  },
};
