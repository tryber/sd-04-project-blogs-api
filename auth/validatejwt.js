const JWT = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) res.status(401).json({ message: 'Token não encontrado' });
    const validation = JWT.verify(token, secret);
    const { password: _, ...user } = validation;
    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
module.exports = validateJWT;
