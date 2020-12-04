const JWT = require('jsonwebtoken');
const secretKey = require('../auth/secretKey');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const payload = JWT.verify(authorization, secretKey);

    const user = await User.findByPk(payload.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
