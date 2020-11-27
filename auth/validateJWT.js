require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'blogsapi';

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const validToken = jwt.verify(token, secret);

    const { email } = validToken;

    req.user = { ...req.user, email };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
