const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) res.status(401).json({ message: 'Token não encontrado' });

    console.log('aqui');

    const validation = jwt.verify(token, secret);

    const { passoword: _, ...user } = validation.dataValues;

    req.user = user;

    next();
  } catch (_err) {
    res.status(500).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = authMiddleware;
