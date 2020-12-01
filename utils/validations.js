const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown(false);

const registerSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).message('"password" length must be 6 characters long').required(),
  image: Joi.string().required(),
}).unknown(false);

const validation = (info, schema) => {
  const { error } = schema.validate(info);
  if (error) throw error;
};

module.exports = {
  loginValidation: (info) => validation(info, loginSchema),
  registerValidation: (info) => validation(info, registerSchema),
};
