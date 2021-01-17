const jwt = require('jsonwebtoken');

const secret = 'a1a1a1a1a1a1a1';

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  try {
    const data = jwt.verify(token, secret);
    const { email } = data;
    req.user = { email };
    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({
      message: 'Token expirado ou inválido',
    });
  }
};

module.exports = tokenValidation;
