const jwt = require('jsonwebtoken');

const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('missing auth token');
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decode = jwt.verify(token, secret);
    const user = decode.data;

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token' });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = authMiddleware;
