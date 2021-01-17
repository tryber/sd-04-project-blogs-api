const joi = require('joi');
const { Users } = require('../models');

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const checkIfEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const emailUser = await Users.findOne({ where: { email } });

  if (!emailUser) {
    res.status(400).json({
      message: 'Campos inválidos',
    });
  }
  next();
};

module.exports = { validationLogin, checkIfEmailExist };
