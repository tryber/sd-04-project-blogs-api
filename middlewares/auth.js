const jwt = require('jsonwebtoken');
const { secret, expiresIn, algorithm } = require('./jwtconfig');

const generateToken = (data) => {
  const token = jwt.sign(data, secret, { algorithm, expiresIn });
  return token;
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    jwt.verify(token, secret);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  generateToken,
  validateToken,
};
