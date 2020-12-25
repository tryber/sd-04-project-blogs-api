require('dotenv/config');

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const validateToken = (token) => {
  const payload = jwt.verify(token, secret);

  return payload;
};

module.exports = validateToken;
