const usersController = require('./usersController');
const loginController = require('./loginController');
const postController = require('./postController');

module.exports = {
  users: usersController,
  login: loginController,
  post: postController,
};
