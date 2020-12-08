const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) res.status(401).json({ message: 'Token não encontrado' });

    const validation = jwt.verify(token, secret);

    const { password: _, ...user } = validation;

    req.user = user;

    next();
  } catch (_err) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
