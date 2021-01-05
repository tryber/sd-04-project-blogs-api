const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token expirado ou invalido' });
  }

  try {
    const decode = jwt.verify(token, secret);
    const user = Users.findOne({ email: decode.data.email });

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Erro: Seu token é inválido' });
  }
};

module.exports = authMiddleware;
