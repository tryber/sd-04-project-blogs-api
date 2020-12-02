const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'opensecret';

const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token.length === 0) {
      return res.status(401).json({ message: 'Token não encontrado' });
    } else {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      next();
    }
    
  } catch (er) {
    console.log(er);
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateJwt;
