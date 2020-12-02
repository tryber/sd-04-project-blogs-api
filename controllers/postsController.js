const { Posts, Users } = require('../models');

const createPost = async (req, res) => {
  try {
    const { user } = req;
    const { title, content } = req.body;
    const post = await Posts.create({
      title,
      content,
      userId: user.id,
    });
    res.status(201).json(post);
  } catch (e) {
    res.status(401).send(e.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const posts = await Posts.findAll({
      include: { model: Users, as: 'user' },
    });
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id,
      { include: { model: Users, as: 'user' } });
    if (!post) {
      res.status(404).send({ message: 'Post não existe' });
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updateById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    let post = await Posts.findByPk(id);
    if (user.id !== post.id) {
      res.status(401).send({ message: 'Usuário não autorizado' });
    }
    if (!post) {
      res.status(401).send({ message: 'Post não encontrado' });
    }
    const { title, content } = req.body;
    await Posts.update(
      { title, content },
      {
        where: {
          id,
        },
      },
    );
    post = await Posts.findByPk(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
};
