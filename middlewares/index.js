const usersCreateMiddleware = require('./usersCreateMiddleware');
const loginMiddleware = require('./loginMiddleware');
const auth = require('./auth');

module.exports = {
  usersCreateMiddleware,
  loginMiddleware,
  auth,
};
