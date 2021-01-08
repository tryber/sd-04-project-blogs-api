const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const registerSchema = joi.object({
  displayName: joi
    .string()
    .regex(/^[a-zA-Z\u00C0-\u00FF\s]+$/)
    .min(8)
    .required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().min(6).message('"password" length must be 6 characters long')
    .required(),
});

const postSchema = joi.object({
  title: joi
    .string()
    .required(),
  content: joi
    .string()
    .required(),
});

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;
  const result = loginSchema.validate({ email, password });
  if (result.error) throw result.error;
  next();
};

const registerValidation = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const result = registerSchema.validate({ displayName, email, password });

  if (result.error) {
    result.error.status = 400;
    throw result.error;
  }
  next();
};

const postValidation = (req, _res, next) => {
  const { title, content } = req.body;
  const result = postSchema.validate({ title, content });

  if (result.error) {
    result.error.status = 400;
    throw result.error;
  }
  next();
};

module.exports = { loginValidation, registerValidation, postValidation };
