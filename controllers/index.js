const userController = require('./userController');
const loginUser = require('./loginUser');

module.exports = {
  user: userController,
  login: loginUser,
};
