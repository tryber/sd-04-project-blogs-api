const jwt = require('jsonwebtoken');

const User = require('../models/Users');

const JWT_SECRET = 'senhasecreta';

const createToken = (payload) => {
  console.log(payload);
  const token = 'oi';
  return token;
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'no token' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne(payload.username);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = { validateToken, createToken };
