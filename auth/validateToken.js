require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const validateToken = (token) => jwt.verify(token, secret);

module.exports = validateToken;
