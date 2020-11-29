const { Post } = require('../models');
// const createToken = require('./createToken');

const getAllPostsServ = async () => Post.findAll({ include: 'user' });

const createPostsServ = async (title, content, id) => Post.create({ title, content, userId: id });

const getPostByIdServ = async (id) => {
  const postId = Post.findAll({ where: { id }, include: 'user' });
  return postId;
};

module.exports = {
  getAllPostsServ,
  createPostsServ,
  getPostByIdServ,
};
