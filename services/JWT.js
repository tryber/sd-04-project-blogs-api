const jwt = require('jsonwebtoken');

const createToken = (payload) => jwt.sign(payload, 'é segredo');

const verifyToken = (token) => jwt.verify(token);

module.exports = { createToken, verifyToken };
