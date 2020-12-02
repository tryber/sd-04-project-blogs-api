const joi = require('joi');

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = validateLogin;
