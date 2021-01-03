const jwt = require('jsonwebtoken');

const secret = 'blogsTrybeapi';

const validate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const userData = jwt.verify(token, secret);
    req.user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validate;
