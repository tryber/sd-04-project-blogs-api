const jwt = require('jsonwebtoken');

const secret = 'trybe2020';
const headers = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (data) => {
  const token = jwt.sign(data, secret, headers);
  return token;
};

const tokenVal = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    req.user = jwt.verify(token, secret);

    return next();
  } catch (_e) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  createToken,
  tokenVal,
};
