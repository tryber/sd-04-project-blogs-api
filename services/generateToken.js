const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const secret = 'brucewayne';
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;
