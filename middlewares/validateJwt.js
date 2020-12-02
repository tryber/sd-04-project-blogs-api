const jwt = require('jsonwebtoken');

const secret = 'opensecret';

const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token.length === 0) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    jwt.verify(token, secret);
    next();
  } catch (er) {
    console.log(er);
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateJwt;
