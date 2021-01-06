const joi = require('joi')

const loginSchema = joi.object({
  displayName: joi
    .string()
    .min(8),
    email:joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().min(6)
    .required(),
});