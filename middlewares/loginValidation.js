const { Users } = require("../models");

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" é um campo obrigatório' });
  }

  if (!email) {
    return res.status(400).json({ message: '"email" não pode ser vazio' });
  }

  return next();
};

const checkPassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: '"password" é obrigatórios' });
  }

  if (password === "") {
    return res.status(400).json({ message: '"password" não pode ser vazio' });
  }

  return next();
};

const checkUserExists = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json({ message: "Campos inválidos" });
  }

  return next();
};

module.exports = { checkEmail, checkPassword, checkUserExists };
