const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const headers = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign({ data: payload }, process.env.SECRET, headers);
  return token;
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { email: decoded.data.email } });

    if (!user) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }

    const { password, ...userInfo } = user;

    req.user = userInfo;

    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { createToken, validateJWT };
