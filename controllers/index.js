const userController = require('./userController');
const loginController = require('./loginController');

module.exports = {
  users: userController,
  login: loginController,
};
