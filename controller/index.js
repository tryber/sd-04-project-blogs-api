const userController = require('./userController');
const loginController = require('./loginController');
const postController = require('./postController');

module.exports = {
  user: userController,
  login: loginController,
  post: postController,
};
