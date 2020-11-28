const Joi = require('joi');
const { usersServices } = require('../services');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.number().min(6).required(),
  image: Joi.string(),
});

const validateCreateUser = async (req, res, next) => {
  try {
    const { body } = req;
    console.log('validateCreateUser', req.body);
    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).json(error.message);
    }

    const user = await usersServices.getUserByEmailServ(body.email);
    console.log('validate-USER', user);

    if (user.email) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
  } catch (error) {
    console.error('validateUser', error);
  }

  next();
};

module.exports = validateCreateUser;
