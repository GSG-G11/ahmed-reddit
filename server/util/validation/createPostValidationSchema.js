/* eslint-disable no-useless-escape */
const Joi = require('joi');

const regexURL =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const createPostValidationSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  content: Joi.string().min(2).required(),
  urlImage: Joi.string().allow('').pattern(regexURL).optional(),
});

module.exports = createPostValidationSchema;
