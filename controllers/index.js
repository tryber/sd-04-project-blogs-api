const userControler = require('./userController');
const loginControler = require('./loginController');
const postController = require('./postController');

module.exports = {
  users: userControler,
  login: loginControler,
  post: postController,
};
