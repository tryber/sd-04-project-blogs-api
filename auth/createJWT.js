const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = crypto.randomBytes(256).toString('base64');

const createJWT = (payload) => {
  const jwtConfig = {
    expiresIn: '15min',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  createJWT,
  secret,
};
