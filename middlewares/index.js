const userMiddlewares = require('./userMiddlewares');
const postMiddlewares = require('./postMiddlewares');
const tokenAuth = require('./tokenAuth');

module.exports = {
  userMiddlewares,
  postMiddlewares,
  tokenAuth,
};
