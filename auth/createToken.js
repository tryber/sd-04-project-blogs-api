const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const secret = 'mySecret';

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = createToken;
