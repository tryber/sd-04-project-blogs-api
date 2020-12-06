const { User } = require('../models');
const createToken = require('../auth/createToken');

const authLogin = async (email, password) => {
  try {
    const userLogin = await User.findOne({ where: { email } });
    const { password: secret, ...user } = userLogin.dataValues;
    switch (true) {
      case !email:
        return { message: '"email" is required' };
      case !password:
        return { message: '"password" is required' };
      case email === '':
        return { message: '"email" is not allowed to be empty' };
      case password === '':
        return { message: '"password" is not allowed to be empty' };
      case password === secret && email === user.email: {
        const token = createToken(user);
        return { token };
      }
      default:
        return;
    }
  } catch (error) {
    return { message: 'Campos inválidos', code: 400 };
  }
};

module.exports = authLogin;
