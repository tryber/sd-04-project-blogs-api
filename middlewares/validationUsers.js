const Joi = require('joi');
const { Users } = require('../models');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = schema.validate({ displayName, email, password, image });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const checkIfEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const emailUser = await Users.findOne({ where: { email } });
  if (emailUser) {
    res.status(409).json({
      message: 'Usuário já existe',
    });
  }
  next();
};

module.exports = { validateCreateUser, checkIfEmailExist };
