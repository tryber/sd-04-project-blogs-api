const jwt = require('jsonwebtoken');
const secret = require('./secret');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = createToken;
