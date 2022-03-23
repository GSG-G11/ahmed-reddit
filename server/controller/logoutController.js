module.exports = {
  logoutController: (_, res, next) => {
    try {
      res.status(200).clearCookie('accessToken').json({
        status: 200,
        message: 'logout successfully, Goodbye 😌',
      });
    } catch (err) {
      next(err);
    }
  },
};
