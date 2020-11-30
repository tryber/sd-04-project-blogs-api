const userController = require('./userController');
const postController = require('./postController');
const loginUser = require('./loginUser');

module.exports = {
  user: userController,
  post: postController,
  login: loginUser,
};
