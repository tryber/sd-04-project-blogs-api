const { User } = require('../models');
const createToken = require('../auth/createToken');

const createUser = async ({ displayName, email, password, image }) => {
  console.log(User);
  const dbUser = await User.findAll({ where: { email } });

  console.log('DB User:', dbUser);

  if (dbUser.length > 0) return { message: 'Usuário já existe' };

  const user = await User.create({ displayName, email, password, image });
  console.log('Created User:', user);

  const token = await createToken({
    email,
    password,
  });
  console.log('Token:', token);

  return { token };
};

module.exports = {
  createUser,
};
