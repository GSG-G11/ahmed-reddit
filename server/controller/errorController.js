/* eslint-disable no-unused-vars */
module.exports = {
  handleErrorNotFound: (_, res, next) => {
    try {
      res.status(404).send(`<h1>404 | Page not Found</h1>`);
    } catch (err) {
      next('SERVER ERROR');
    }
  },
  handleErrorServer: (error, req, res, next) => {
    if (error.status) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    } else {
      res.status(500).json({ status: 500, message: 'SERVER ERROR' });
    }
  },
};
