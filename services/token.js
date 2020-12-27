const jwt = require('jsonwebtoken');

const secret = 'blogsTrybeapi';

const create = (payload) => {
  const headers = {
    algorithm: 'HS256',
  };

  return jwt.sign(payload, secret, headers);
};

const validate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) res.status(401).json({ message: 'Token não existe' });

  try {
    const validation = jwt.verify(token, secret);

    req.user = validation.email;

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { create, validate };
