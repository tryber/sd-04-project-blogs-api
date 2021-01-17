const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const SECRET = 'trybe2020';

const USERSCHEMA = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
}).unknown(true);

const LOGINSCHEMA = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, headers);

  return token;
}

const validateUserEntries = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = Object.keys(body).length > 2
      ? USERSCHEMA.validate(body)
      : LOGINSCHEMA.validate(body);

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

const validateKeys = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (!user) throw new Error();

    const { password: _, ...userSafe } = user;

    req.token = createToken(userSafe);

    next();
  } catch (e) {
    res.status(400).json({ message: 'Campos inválidos' });
  }
};

const validaJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) res.status(401).json({ message: 'Token não encontrado' });

    const data = jwt.verify(token, SECRET);

    req.user = data.dataValues;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  validateUserEntries,
  validaIfExist,
  validaToken,
  validateKeys,
  validaJWT,
};
