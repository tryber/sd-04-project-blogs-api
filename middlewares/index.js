const usersCreateMiddleware = require('./usersCreateMiddleware');
const loginMiddleware = require('./loginMiddleware');
const postCreateMiddleware = require('./postCreateMiddleware');

const auth = require('./auth');

module.exports = {
  usersCreateMiddleware,
  loginMiddleware,
  postCreateMiddleware,
  auth,
};
