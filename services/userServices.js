const { User } = require('../models');
const validateUser = require('../utils/newUserValidation');

const newUserValidation = async (payload) => validateUser(payload);

module.exports = {
  newUserValidation,
};
