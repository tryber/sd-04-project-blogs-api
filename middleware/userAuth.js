const jwt = require('jsonwebtoken');

const { secret } = require('../config/Auth');

const auth = (req, res, next) => {
  const tokenAuth = req.headers.authorization;

  if (!tokenAuth) throw { message: 'Token não encontrado', status: 401 };

  const tokenParts = tokenAuth.split(' ');
  if (!(tokenParts.length === 2)) throw { message: 'Token expirado ou inválido', status: 401 };

  const [schema, token] = tokenParts;
  if (!/^Bearer$/i.test(schema)) {
    return res.status(401).json({ message: 'token unformatted' });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'token invalid' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { auth };
