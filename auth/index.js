const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = crypto.randomBytes(256).toString('base64');

const createJWT = (payload) => {
  const jwtConfig = {
    expiresIn: '15min',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    jwt.verify(token, secret);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  createJWT,
  secret,
  validateToken,
};
