const jwt = require('jsonwebtoken');

const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

const createToken = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  const token = jwt.sign(payload, secret, options);

  return token;
};

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Token expirado ou invalido' });
    }
    const decode = jwt.verify(token, secret);
    const user = decode.data;
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token' });
    }
    req.user = user;
    return next();
  } catch (err) {
    // console.error(err);
    res.status(401).json({ message: 'Erro: Seu token é inválido' });
  }
};

module.exports = { authMiddleware, createToken };
