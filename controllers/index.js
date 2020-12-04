const {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('./userController');
const { loginUser } = require('./loginController');
const {
  createPost,
  getAllPostsUser,
  getPostById,
  deletePost,
} = require('./blogController');

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  loginUser,
  createPost,
  getAllPostsUser,
  getPostById,
  deletePost,
};
