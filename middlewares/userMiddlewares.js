const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const SECRET = 'trybe2020';

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.base': `"displayName" should be a type of 'text'`,
    'string.min': '"displayName" length must be at least 8 characters long',
    'any.required': `"displayName" must exist`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.base': `"email" should be a type of 'text'`,
      'string.email': `"email" must be a valid email`,
      'any.required': `"email" is required`,
    }),
  password: Joi.string().min(6).required().messages({
    'string.base': `"password" should be a type of 'text'`,
    'string.min': '"password" length must be 6 characters long',
    'any.required': `"password" is required`,
  }),
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

    return res.status(404).json({ message });
  }
};

const validaIfExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(Users)
    const user = await Users.findOne({ where: { email: `${email}` } });

    if (user) throw new Error();

    next();
  } catch (e) {
    res.status(404).json({ message: 'Usuário já existe' });
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
