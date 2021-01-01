require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'BlogsAPI';

const createToken = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '12h',
  };
  const token = jwt.sign(payload, secret, options);

  return token;
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const verifiedToken = jwt.verify(token, secret);

    const { email } = verifiedToken;

    req.user = { email };

    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { validateToken, createToken };
