const jwt = require('jsonwebtoken');

const secret = 'mayTheForceBeWithYou';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const data = jwt.verify(token, secret);

    // codigo antes da refatoração

    // const { email } = data;
    // req.user = { email };

    // /////////////

    req.user = data;

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateJWT;
