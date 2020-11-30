const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const SECRET = 'trybe2020';

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown(true);

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, headers);

  return token;
}

const validateUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = userSchema.validate(body, {
      abortEarly: true,
    });

    if (error) throw new Error(error.details[0].message);

    next();
  } catch (error) {
    const { message } = error;

    return res.status(400).json({ message });
  }
};

const validaIfExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email: `${email}` } });

    if (user) throw new Error();

    next();
  } catch (e) {
    res.status(409).json({ message: 'Usuário já existe' });
  }
};

const validaToken = async (req, _res, next) => {
  const { body } = req;
  const { password: _, ...bodySafe } = body;

  req.token = createToken(bodySafe);

  next();
};

module.exports = {
  validateUser,
  validaIfExist,
  validaToken,
};
