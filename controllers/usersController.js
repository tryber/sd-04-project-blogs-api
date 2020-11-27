const rescue = require('express-rescue');
const { usersServices } = require('../services');

const getAllUsersCont = rescue(async (_req, res) => {
  const allUsers = await usersServices.getAllUsersServ();

  return res.status(200).json(allUsers);
});

const loginUserCont = rescue(async (req, res) => {
  const { email, password } = req.body;

  const { token } = await usersServices.userLoginServ(email, password);

  return res.status(200).json({ token });
});

module.exports = {
  getAllUsersCont,
  loginUserCont,
};
