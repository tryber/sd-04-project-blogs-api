const jwt = require('jsonwebtoken');

const secret = 'Descubra';

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = createToken;
