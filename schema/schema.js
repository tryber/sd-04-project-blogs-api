const { Joi } = require('frisby');
// joi documentation https://joi.dev/api/?v=17.3.0
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  image: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().allow('').required(),
    password: Joi.string().allow('').required(),
  });

module.exports = { userSchema, loginSchema };
