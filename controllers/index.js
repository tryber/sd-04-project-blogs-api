const userControllers = require('./userControllers');
const postControllers = require('./postControllers');

module.exports = {
  user: userControllers,
  posts: postControllers,
};
