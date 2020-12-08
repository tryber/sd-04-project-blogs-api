const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validadeUsers = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = validadeUsers;
