const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { JWT_CONFIG, SECRET } = require('../utils/jwtConfig');
const { messages } = require('../utils/messages');
const validateUser = require('../utils/newUserValidation');

const newUserValidation = async (payload) => {
  const { password: _, ...withoutPass } = payload;
  const isValidated = validateUser(payload);
  if (typeof isValidated === 'string') {
    return isValidated;
  }
  const userInfo = await Users.findOne({ where: { email: payload.email } });
  if (userInfo) {
    return messages.userErrorUserAlreadyExists;
  }
  await Users.create(payload);
  const token = jwt.sign({ data: withoutPass }, SECRET, JWT_CONFIG);
  return { token };
};

module.exports = {
  newUserValidation,
};
