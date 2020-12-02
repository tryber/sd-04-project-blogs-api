const { Op } = require('sequelize');
const { Post } = require('../models');

const getAllPostsServ = async () => Post.findAll({ include: 'user' });

const createPostsServ = async (title, content, id) => Post.create({ title, content, userId: id });

const getPostByIdServ = async (id) => {
  const postId = Post.findAll({ where: { id }, include: 'user' });
  return postId;
};

const updatePostServ = async (title, content, id, userId) => {
  await Post.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

const deletePostServ = async (id) => {
  Post.destroy({ where: { id } });
};

const searchTermPostServ = async (term) => {
  const searchPost = await Post.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${term}%` } }, { content: { [Op.like]: `%${term}%` } }],
    },
    include: 'user',
  });
  return searchPost || [];
};

module.exports = {
  getAllPostsServ,
  createPostsServ,
  getPostByIdServ,
  updatePostServ,
  deletePostServ,
  searchTermPostServ,
};
