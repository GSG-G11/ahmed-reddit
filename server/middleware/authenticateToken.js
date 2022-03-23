const { checkToken } = require('../util');

module.exports = {
  // protected middleware
  authenticateToken: (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(302).redirect('/');

    return checkToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
      .then(({ id, username }) => {
        req.body.id = id;
        req.body.username = username;
        next();
      })
      .catch((error) => next(error));
  },
};
