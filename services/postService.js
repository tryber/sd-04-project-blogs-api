const { Post } = require('../models');

const getPost = async (id) => {
  const post = await Post.findOne({ where: { id }, include: 'user' });

  if (!post) return { message: 'Post não existe' };

  return post;
};

const editPost = async (title, content, id, userId) => {
  const { user } = await Post.findByPk(id, { include: 'user' });

  if (!user) return { status: 404, message: 'Post não existe' };

  if (userId !== user.id) return { status: 401, message: 'Usuário não autorizado' };

  await Post.update({ title, content }, { where: { id } });
  return { status: 200 };
};

module.exports = {
  getPost,
  editPost,
};
