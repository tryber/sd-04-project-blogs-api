const jwt = require('jsonwebtoken');
const { secret, expiresIn, algorithm } = require('./jwtconfig');

const generateToken = (data) => {
  const token = jwt.sign(data, secret, { algorithm, expiresIn });
  return token;
};

module.exports = {
  generateToken,
};
