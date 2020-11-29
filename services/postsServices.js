const { Post } = require('../models');
// const createToken = require('./createToken');

const getAllPostsServ = async () => Post.findAll({ include: 'user' });

const createPostsServ = async (title, content, id) => Post.create({ title, content, userId: id });

module.exports = {
  getAllPostsServ,
  createPostsServ,
};
