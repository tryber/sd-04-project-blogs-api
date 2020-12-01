const {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('./userController');
const { loginUser } = require('./loginController');

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  loginUser,
};
