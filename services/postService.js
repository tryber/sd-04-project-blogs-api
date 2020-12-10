const { Post } = require('../models');

const getPost = async (id) => {
  const post = await Post.findOne({ where: { id }, include: 'user' });

  if (!post) return { message: 'Post não existe' };

  return post;
};

module.exports = {
  getPost,
};
