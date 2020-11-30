const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

const loginValidation = (loginInfo) => {
  const { error } = loginSchema.validate(loginInfo);
  if (error) throw error;
};

module.exports = { loginValidation };
