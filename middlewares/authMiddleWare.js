const jwt = require('jsonwebtoken');

// const User = require('../models/Users');

const JWT_SECRET = 'senhasecreta';

const createNewJWT = (payload) => {
  const jwtconfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, JWT_SECRET, jwtconfig);

  return token;
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'no token' });
    }

    console.log(token);

    // const payload = jwt.verify(token, JWT_SECRET);

    // req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = { validateToken, createNewJWT };
