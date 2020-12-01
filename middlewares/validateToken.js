const { MISSING_TOKEN, INVALID_TOKEN } = require('../errors');
const { verifyToken } = require('../services/JWT');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw MISSING_TOKEN;
  const result = verifyToken(authorization);
  if (!result) throw INVALID_TOKEN;
  req.user = result.data;
  next();
};

module.exports = validateToken;
