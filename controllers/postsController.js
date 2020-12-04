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
      res.status(404).send({ message: 'Post não existe' });
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

const excludeById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const post = await Posts.findByPk(id);
    if (!post) {
      res.status(404).send({ message: 'Post não existe' });
    }
    if (user.id !== post.id) {
      res.status(401).send({ message: 'Usuário não autorizado' });
    }
    await Posts.destroy({
      where: {
        id,
      },
    });
    res.status(204).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Posts.findAll({
      include: { model: Users, as: 'user' },
    });
    if (!q) {
      res.status(200).json(posts);
    }
    const postsFilter = posts.filter((post) =>
      post.title.includes(q) || post.content.includes(q));
    res.status(200).json(postsFilter);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
  searchPost,
  excludeById,
};
