const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const secret = 'blogapi';
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const user = jwt.verify(token, secret);
    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = auth;
