const jwt = require('jsonwebtoken');

const secret = 'pass123';

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    if (!token || !data) {
      return res.status(403).json({ message: 'token invalid' });
    }

    const { iat, exp, ...userData } = data;
    req.user = userData;

    next();
  } catch (err) {
    console.error('validateToken', err);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

module.exports = validateToken;
