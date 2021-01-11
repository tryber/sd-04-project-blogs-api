const { Op } = require('sequelize');
const { Posts, Users } = require('../models');

const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const { email } = req.user;

    const user = await Users.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });

    return res.status(201).json({ title, content, userId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong... create new post' });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong... get all posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id, {
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Something wrong on get Post ById' });
  }
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const post = await Posts.findOne({ where: { id } });

    if (!post) return res.status(400).json({ message: 'Post não existe' });

    const userIsAuthor = await Users.findOne({ where: { email: req.user.email } });

    if (userIsAuthor.dataValues.id !== post.dataValues.userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await Posts.update({ title, content }, { where: { id } });

    res.status(200).json({ title, content, userId: userIsAuthor.dataValues.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong on update...' });
  }
};

const removePost = async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    if (post.dataValues.userId !== req.user.id) {
      res.status(401).json({ message: 'Usuário não autorizado' });
    }
    await Posts.destroy({ where: { id: req.params.id } });
    res.status(204).json({ message: 'post deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong on delete' });
  }
};

const findPost = async (req, res) => {
  const { q } = req.query;

  try {
    const posts = await Posts.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            content: {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      },
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });

    return res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong on find post' });
  }
};

module.exports = { getAllPosts, createNewPost, getPostById, removePost, updatePost, findPost };
