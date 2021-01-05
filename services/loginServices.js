const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};
const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

const userLoginValidation = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } })
    .then(({ dataValues }) => {
      if (email !== dataValues.email || password !== dataValues.password) {
        return res.status(400).json({ message: 'Campos invalidos' });
      }
      const token = jwt.sign({ data: dataValues }, secret, jwtConfig);
      res.status(200).json({ token });
    });
};

module.exports = { userLoginValidation };
