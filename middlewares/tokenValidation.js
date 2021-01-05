const jwt = require('jsonwebtoken');

const JWT_SECRET = 'opaopaopa!';

const createJWT = (payload) => {
  const headers = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, JWT_SECRET, headers);

  return token;
};

const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  authentication,
  createJWT,
};
