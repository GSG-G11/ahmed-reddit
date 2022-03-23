/* eslint-disable no-unused-vars */
const { join } = require('path');

module.exports = {
  handleErrorNotFound: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(join(__dirname, '..', '..', 'public', 'views', '404.html'));
    } catch (err) {
      next('SERVER ERROR');
    }
  },
  handleErrorServer: (error, req, res, next) => {
    if (error.status) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
        massages: error.massages,
      });
    } else {
      res.status(500).json({ status: 500, message: 'SERVER ERROR' });
    }
  },
};
