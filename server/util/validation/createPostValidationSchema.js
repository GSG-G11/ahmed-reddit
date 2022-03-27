/* eslint-disable no-useless-escape */
const Joi = require('joi');


const createPostValidationSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  content: Joi.string().min(2).required(),
  createdAt: Joi.string().required(),
});

module.exports = createPostValidationSchema;
