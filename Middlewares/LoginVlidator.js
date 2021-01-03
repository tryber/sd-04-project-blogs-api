const Joi = require('joi');

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const validateLoginData = (req, res, next) => {
  const login = req.body;

  const validation = loginSchema.validate(login);

  if (validation.error) {
    return res.status(400).json({ message: validation.error.message });
  }

  next();
};

module.exports = validateLoginData;
