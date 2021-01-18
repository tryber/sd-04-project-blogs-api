require('dotenv').config();
const jwt = require('jsonwebtoken');

const config = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const secret = process.env.TOKEN_SECRET || 'jwtsecret';

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, config);
  return token;
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const tokenData = jwt.verify(token, secret);
    const { email, id } = tokenData;
    req.user = { email, id };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { createToken, validateToken };
