const jwt = require('jsonwebtoken');

const secret = 'user';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = jwt.sign({ data: user }, secret, jwtConfig);

res.status(200).json({ token });
