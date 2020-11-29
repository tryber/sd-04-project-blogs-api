const jwt = require('jsonwebtoken');

const secret = 'pass123';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const data = jwt.verify(token, secret);

    const { password, ...userData } = data;

    req.user = userData;

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
