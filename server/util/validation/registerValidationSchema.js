/* eslint-disable no-useless-escape */
const Joi = require('joi');

const registerValidationSchema = Joi.object({
  username: Joi.string().min(2).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  confirmPassword: Joi.ref('password'),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)
    .min(6)
    .required(),
});

module.exports = registerValidationSchema;
