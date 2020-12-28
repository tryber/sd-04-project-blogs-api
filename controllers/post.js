const { Users, Posts } = require('../models');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  try {
    console.log(userId);
    await Posts.create({ title, content, userId });

    return res.status(201).json({ title, content, userId });
  } catch (error) {
    return res.status(204).json({ message: 'Erro ao criar usuário' });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await Posts.findAll({ include: 'user' });

  return res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id }, include: 'user' });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, content } = req.body;

  const post = await Posts.findOne({ where: { id }, include: 'user' });

  if (!post) {
    return res.status(404).json({ message: 'Post não encontrado' });
  }

  if (!userId || userId !== post.user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  try {
    await Posts.update({ title, content }, { where: { id } });

    return res.status(200).json({title, content, userId });
  } catch (error) {
    return res.status(404).json({ message: 'Erro ao atualizar' });
  }
};

module.exports = { create, getAllPosts, getPost, updatePost };
