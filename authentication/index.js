require('dotenv').config();
const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = process.env.TOKEN_SECRET || 'pantaLover';

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

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
    console.error(err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { createToken, validateToken };
