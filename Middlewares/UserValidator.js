const { isSchema } = require('joi');
const Joi = require('joi');

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validateUserData = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const validation = userSchema.validate({
    displayName,
    email,
    password,
    image,
  });

  if (validation.error) {
    return res.status(400).json({ message: validation.error.message });
  }

  next();
};

module.exports = validateUserData;
