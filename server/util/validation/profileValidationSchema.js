/* eslint-disable no-useless-escape */
const Joi = require('joi');

const regexURL =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;


const profileValidationSchema = Joi.object({
  username: Joi.string().min(2).max(25).required(),
  age: Joi.number().integer(),
  bio: Joi.string().allow('').optional(),
  urlImage: Joi.string().allow('').pattern(regexURL).optional(),
});

module.exports = profileValidationSchema;
