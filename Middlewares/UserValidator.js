const { isSchema } = require('joi');
const Joi = require('joi');

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const validateUserData = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = userSchema.validate({
    displayName,
    email,
    password,
    image,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

module.exports = validateUserData;
