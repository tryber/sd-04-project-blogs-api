const jwt = require('jsonwebtoken');

const secret = 'é segredo';

const createToken = (payload) => jwt.sign(payload, secret);

const verifyToken = (token) => jwt.verify(token, secret, (err, decoded) => (err ? null : decoded));

module.exports = { createToken, verifyToken };
