const loginController = require('./loginController');
const userController = require('./userController');
const blogPostController = require('./blogPostController');

module.exports = { login: loginController, user: userController, blogPost: blogPostController };
