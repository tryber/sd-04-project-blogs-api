const { Users, Posts } = require('../models');

const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    await Posts.create({ title, content, userId });

    res.status(201).json({ title, content, userId });
  } catch (error) {
    res.status(401).json({ message: 'bad erro' });
  }
};

const getPost = async (_req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: 'bad status' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findByPk(id, {
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });

    if (!post) throw new Error('Post não existe');

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Posts.findOne({ where: { id } });

    if (post.dataValues.userId !== userId) throw new Error('Usuário não autorizado');

    await Posts.update({ title, content }, { where: { id } });

    res.status(200).json({ title, content, userId });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const post = await Posts.findOne({ where: { id } });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    if (post.dataValues.userId !== userId) throw new Error('Usuário não autorizado');

    await Posts.destroy({ where: { id } });

    res.status(204).json({ message: 'excluido' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
