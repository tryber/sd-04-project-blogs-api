const { Joi } = require('frisby');
// joi documentation https://joi.dev/api/?v=17.3.0
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.min':
            err.message = '"password" length must be 6 characters long';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  image: Joi.string(),
});

module.exports = { userSchema };
