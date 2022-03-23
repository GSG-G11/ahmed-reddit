const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateToken: (object, accessTokenSecret, options = {}) =>
    new Promise((resolve, reject) => {
      sign(object, accessTokenSecret, options, (error, payload) => {
        if (error) return reject(error);
        return resolve(payload);
      });
    }),
  checkToken: (token, accessTokenSecret) =>
    new Promise((resolve, reject) => {
      verify(token, accessTokenSecret, (error, payload) => {
        if (error) return reject(error);
        return resolve(payload);
      });
    }),
};
