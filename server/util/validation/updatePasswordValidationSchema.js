/* eslint-disable no-useless-escape */
const Joi = require('joi');

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

const updatePasswordValidationSchema = Joi.object({
  currentPassword: Joi.string().pattern(regexPassword).min(6).required(),

  password: Joi.string().pattern(regexPassword).min(6).required(),

  confirmPassword: Joi.ref('password'),
});

module.exports = updatePasswordValidationSchema;
