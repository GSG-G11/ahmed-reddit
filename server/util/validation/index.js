const registerValidationSchema = require('./registerValidationSchema');
const loginValidationSchema = require('./loginValidationSchema');
const profileValidationSchema = require('./profileValidationSchema');
const updatePasswordValidationSchema = require('./updatePasswordValidationSchema');
const createPostValidationSchema = require('./createPostValidationSchema');
const updatePostValidationSchema = require('./updatePostValidationSchema');
const createCommentValidationSchema = require('./createCommentValidationSchema');

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  profileValidationSchema,
  updatePasswordValidationSchema,
  createPostValidationSchema,
  updatePostValidationSchema,
  createCommentValidationSchema,
};
