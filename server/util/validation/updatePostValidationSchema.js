/* eslint-disable no-useless-escape */
const Joi = require('joi');


const updatePostValidationSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  content: Joi.string().min(2).required(),
  postID: Joi.number().required(),
});

module.exports = updatePostValidationSchema;
