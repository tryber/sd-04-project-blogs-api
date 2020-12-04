const Joi = require('@hapi/joi');

const validateUser = Joi.object({
  displayName: Joi.string()
    .options({ allowUnknown: true })
    .trim()
    .min(8)
    .messages({
      'string.base': '"displayName" length must be at least 8 characters long',
      'string.empty': '"displayName" length must be at least 8 characters long',
      'string.min': '"displayName" length must be at least 8 characters long',
      'any.required': '"displayName" length must be at least 8 characters long',
    }),
  email: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))
    .messages({
      'string.pattern.base': '"email" must be a valid email',
      'string.base': '"email" must be a valid email',
      'string.empty': '"email" is not allowed to be empty',
      'any.required': '"email" is required',
    }),
  password: Joi.string().required().min(6).messages({
    'string.min': '"password" length must be 6 characters long',
    'string.empty': '"password" is not allowed to be empty',
    'any.required': '"password" is required',
  }),
});

const validateBlog = Joi.object({
  title: Joi.string().required().messages({
    'string.base': '"title" is required',
    'string.empty': '"title" is required',
    'any.required': '"title" is required',
  }),
  content: Joi.string().required().messages({
    'string.base': '"content" is required',
    'string.empty': '"content" is required',
    'any.required': '"content" is required',
  }),
});

module.exports = {
  validateUser,
  validateBlog,
};
