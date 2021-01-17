const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '1h', // expira em 1h
  algorithm: 'HS256',
};

const secret = 'a1a1a1a1a1a1a1';

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = createToken;
