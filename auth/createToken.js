require('dotenv').config();
const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = process.env.SECRET;

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = createToken;
