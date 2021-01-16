const login = require('./loginController');
const userController = require('./userController');
const postController = require('./postController');

module.exports = {
  login,
  posts: postController,
  users: userController,
};
