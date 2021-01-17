const jwt = require('jsonwebtoken');

const secret = 'user';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    // Passa os dados do usuario validado para ser usado nas rotas
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
