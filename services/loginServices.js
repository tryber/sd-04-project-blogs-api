const { Users } = require('../models');
const messageError = require('../utils/messageError');

const dataLoginValidation = (req, res, next) => {
  const { email, password } = req.body;
  let data = next();
  if (email === '') {
    data = messageError(res, 400, '"email" is not allowed to be empty');
  }
  if (email === undefined) {
    data = messageError(res, 400, '"email" is required');
  }
  if (password === '') {
    data = messageError(res, 400, '"password" is not allowed to be empty');
  }
  if (password === undefined) {
    data = messageError(res, 400, '"password" is required');
  }

  return data;
};

const userLoginValidation = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email: email || '' } });

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  return next();
};

module.exports = { userLoginValidation, dataLoginValidation };
