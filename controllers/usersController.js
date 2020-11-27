const { usersServices } = require('../services');

const getAllUsersCont = async (_req, res) => {
  const allUsers = await usersServices.getAllUsersServ();

  return res.status(200).json(allUsers);
};

module.exports = {
  getAllUsersCont,
};
