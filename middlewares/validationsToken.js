const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sddsRenatao';

const validationsToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const hasToken = jwt.verify(token, JWT_SECRET);
    const { email } = hasToken;

    req.user = { ...req.user, email };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validationsToken;
