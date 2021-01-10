const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { JWT_CONFIG, SECRET } = require('../utils/jwtConfig');
const { messages } = require('../utils/messages');
const { validateUser, validateLogin } = require('../utils/newUserValidation');

const generateToken = async (userInfo) => {
  const token = jwt.sign({ data: userInfo }, SECRET, JWT_CONFIG);
  return { token };
};

const removePassword = (payload) => {
  const { password: _, ...withoutPass } = payload;
  return withoutPass;
};

const findAUser = async (id) => {
  const result = await Users.findByPk(id);
  if (result) {
    return removePassword(result.dataValues);
  }
  return messages.userErrorUserDoesNotExist;
};

const listUsers = async () => {
  const usersList = await Users.findAll();
  const listFormated = usersList.map(({ dataValues }) => removePassword(dataValues));
  return listFormated;
};

const loginValidation = async (payload) => {
  const isLogininvalid = validateLogin(payload);
  if (typeof isLogininvalid === 'string') {
    return isLogininvalid;
  }
  const userInfo = await Users.findOne({ where: { email: payload.email } });
  if (!userInfo) {
    return messages.userErrorInvalidLogin;
  }
  const withoutPass = removePassword(userInfo);
  return generateToken(withoutPass);
};

const newUserValidation = async (payload) => {
  const withoutPass = removePassword(payload);
  const isValidated = validateUser(payload);
  if (typeof isValidated === 'string') {
    return isValidated;
  }
  const userInfo = await Users.findOne({ where: { email: payload.email } });
  if (userInfo) {
    return messages.userErrorUserAlreadyExists;
  }
  await Users.create(payload);
  return generateToken(withoutPass);
};

module.exports = {
  findAUser,
  listUsers,
  loginValidation,
  newUserValidation,
};
