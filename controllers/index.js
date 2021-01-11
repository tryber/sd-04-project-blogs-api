const login = require('./loginController');
const userController = require('./userController');

module.exports = {
  users: userController,
  login,
};
