const jwt = require('jsonwebtoken');
const { secret } = require('../services');

const authJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const data = jwt.verify(token, secret);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  authJWT,
};
