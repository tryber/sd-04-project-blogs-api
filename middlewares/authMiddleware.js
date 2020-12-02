const validateToken = require('../auth/validateToken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) res.redirect('/login');

    const validation = validateToken(token);

    const { passoword: _, ...user } = validation.dataValues;

    req.user = user;

    next();
  } catch (_err) {
    res.status(500).json({ message: 'token inválido!' });
  }
};

module.exports = authMiddleware;
