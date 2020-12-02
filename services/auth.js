const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const findByEmail = async (email) => {
  const user = await Users.findOne({
    where: { email },
  });
  return user;
};

const auth = async (req, res, next) => {
  const secret = 'brucewayne';

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await findByEmail(decoded.data.email);


    if (!user) {
      res.status(401).send({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

    next();
  } catch (e) {
    console.log(e.message)
    res.status(401).send({ message: 'Token expirado ou inválido' });
  }
};

module.exports = auth;
