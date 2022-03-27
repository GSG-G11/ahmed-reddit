/* eslint-disable no-useless-escape */
const Joi = require('joi');

const createCommentValidationSchema = Joi.object({
  postId: Joi.number().required(),
  content: Joi.string().min(2).required(),
});

module.exports = createCommentValidationSchema;
