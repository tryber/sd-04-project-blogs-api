const { Post } = require('../models');
// const createToken = require('./createToken');

const getAllPostsServ = async () => Post.findAll({ include: 'user' });

module.exports = {
  getAllPostsServ,
};
