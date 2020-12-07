const { User } = require('../models');
const createToken = require('../auth/createToken');

const createUser = async ({ displayName, email, password, image }) => {
  const dbUser = await User.findAll({ where: { email } });

  if (dbUser.length > 0) return { message: 'Usuário já existe' };

  const { id } = await User.create({ displayName, email, password, image });

  console.log(id);

  const token = await createToken({
    id,
    email,
    password,
  });

  return { token };
};

const loginUser = async ({ email, password }) => {
  const dbUser = await User.findAll({ where: { email } });

  if (dbUser.length === 0) return { message: 'Campos inválidos' };

  const token = await createToken({
    email,
    password,
  });

  return { token };
};

module.exports = {
  createUser,
  loginUser,
};
