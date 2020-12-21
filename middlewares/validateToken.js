const jwt = require('jsonwebtoken');
const secret = require('./secret');

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) res.status(401).json({ message: 'Token não encontrado' });
    const valitation = jwt.verify(token, secret);
    const { password: _ , ...user } = valitation;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { validateToken };
