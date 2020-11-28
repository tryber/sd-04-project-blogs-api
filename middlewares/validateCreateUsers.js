const Joi = require('joi');
// const { User } = require('../models');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validateCreateUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { error } = schema.validate({ displayName, email, password, image });

    if (error) {
      return res.status(400).json(error.message);
    }

    // const user = await User.findAll({ where: { email } });
    // if (user.length > 0) return next({ message: 'Usuário já existe' });
  } catch (error) {
    console.error('validateUser', error);
  }

  next();
};

module.exports = validateCreateUser;
