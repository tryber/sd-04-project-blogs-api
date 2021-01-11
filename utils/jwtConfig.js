const SECRET = 'mysecret';

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  JWT_CONFIG,
  SECRET,
};
