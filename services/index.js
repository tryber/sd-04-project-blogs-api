const createToken = require('./createToken');
const usersServices = require('./usersServices');
const postsServices = require('./postsServices');
const secret = require('./secret');

module.exports = {
  createToken,
  secret,
  usersServices,
  postsServices,
};
