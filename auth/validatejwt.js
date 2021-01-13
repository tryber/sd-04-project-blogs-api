const jwt = require('jsonwebtoken');

const secret = 'vinis2josias';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const data = jwt.verify(token, secret);

    const { email, id } = data;

    req.user = { email, id };

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateJWT;
