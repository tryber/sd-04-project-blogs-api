const { Op } = require('sequelize');
const { Post } = require('../models');

const getPost = async (id) => {
  const post = await Post.findOne({ where: { id }, include: 'user' });

  if (!post) return { message: 'Post não existe' };

  return post;
};

const editPost = async (title, content, id, userId) => {
  const post = await Post.findByPk(id, { include: 'user' });

  if (!post) return { status: 404, message: 'Post não existe' };

  if (userId !== post.id) return { status: 401, message: 'Usuário não autorizado' };

  await Post.update({ title, content }, { where: { id } });
  return { status: 200 };
};

const searchPost = async (q) => {
  const post = await Post.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
    },
    include: 'user',
  });
  return post;
};

const deletePost = async (id, userId) => {
  const post = await Post.findByPk(id, { include: 'user' });

  if (!post) return { status: 404, message: 'Post não existe' };

  if (userId !== post.id) return { status: 401, message: 'Usuário não autorizado' };

  await Post.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = {
  getPost,
  editPost,
  searchPost,
  deletePost,
};
