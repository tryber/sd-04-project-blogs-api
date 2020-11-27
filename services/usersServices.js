const { User } = require('../models');

const getAllUsersServ = async () => User.findAll();

module.exports = {
  getAllUsersServ,
};
