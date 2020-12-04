const { User } = require('../models');

/**
 * getDate
 *
 * Função que obtên a data e hora atual
 * Referência
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
 * 2020-12-1 12:00:00
 */
const getDate = async () => {
  const date = await new Date();
  const formatDate = new Date(date).toISOString();

  return formatDate;
};

const findUserByEmail = async (find) => {
  const findUser = await User.findOne({ where: { email: find } });
  // console.log('Resulte', result);
  return findUser;
};

/**
 * POST '/user' - resgister user
 * Quando o cadastro do usuário é feito
 * verifica se o email já está cadastrado
 */
const verifyUser = async (req, res, next) => {
  const userEmail = req.body.email;
  const result = await findUserByEmail(userEmail);
  // console.log('teste', result);

  if (result !== null) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  next();
};

/**
 * POST '/login' - login user
 * Quando o Login é feito verifica se o email já está cadastrado
 * Se estiver cadastrado retorna os dados do usuário
 *
 * Método .toJSON() - converte o dados sequelize em objeto
 */
const verifyLogin = async (req, res, next) => {
  const userEmail = req.body.email;
  const result = await findUserByEmail(userEmail);
  if (result !== null) {
    // console.log('nome', result.toJSON());
    // Obtên os dados do usuário logado para montar a chave - Token
    const { password, ...userToken } = result.toJSON();
    req.user = userToken;
    return next();
  }
  return res.status(400).json({ message: 'Campos inválidos' });
};
module.exports = { verifyUser, verifyLogin, findUserByEmail, getDate };
