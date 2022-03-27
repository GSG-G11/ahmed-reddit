/* eslint-disable no-useless-escape */
const Joi = require('joi');


const profileValidationSchema = Joi.object({
  username: Joi.string().min(2).max(25).required(),
  age: Joi.number(),
  bio: Joi.string().trim(),
});

module.exports = profileValidationSchema;
