const { CustomError } = require('./CustomError');
const { hashPassword, comparePasswords } = require('./hashing');
const { generateToken, checkToken } = require('./jwt-webToken');

const {
  registerValidationSchema,
  loginValidationSchema,
  profileValidationSchema,
  updatePasswordValidationSchema,
  createPostValidationSchema,
  updatePostValidationSchema,
  createCommentValidationSchema,
} = require('./validation');

module.exports = {
  CustomError,
  hashPassword,
  comparePasswords,
  generateToken,
  checkToken,
  registerValidationSchema,
  loginValidationSchema,
  profileValidationSchema,
  updatePasswordValidationSchema,
  createPostValidationSchema,
  updatePostValidationSchema,
  createCommentValidationSchema,
};
