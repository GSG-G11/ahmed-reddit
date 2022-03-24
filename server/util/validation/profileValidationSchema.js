/* eslint-disable no-useless-escape */
const Joi = require('joi');

const regexURL =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const profileValidationSchema = Joi.object({
  username: Joi.string().min(2).required(),
  age: Joi.number(),
  urlImage: Joi.string().pattern(regexURL),
  bio: Joi.string().trim(),
});

module.exports = profileValidationSchema;
