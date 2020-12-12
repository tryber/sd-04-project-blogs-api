const jwt = require('jsonwebtoken');

const secret = 'mySecret';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const verify = jwt.verify(token, secret);
    // console.log(verify);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = verifyToken;
