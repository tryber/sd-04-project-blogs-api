require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = 'sddsRenatao';

const authMiddleware = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '12h',
  };
  const token = jwt.sign(payload, secret, options);

  return token;
};

module.exports = authMiddleware;
