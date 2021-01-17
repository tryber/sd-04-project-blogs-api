const secret = 'blogsapisenha';
const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '50m',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = createToken;
