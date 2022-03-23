const { hash, compare } = require('bcryptjs');

module.exports = {
  hashPassword: (password) => hash(password, 10),
  comparePasswords: (password, hashedPassword) =>
    compare(password, hashedPassword),
};
