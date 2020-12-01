require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sddsRenatao';

const authMiddleware = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '50m',
  };
  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
};

module.exports = authMiddleware;
