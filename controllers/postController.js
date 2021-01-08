const { Posts, Users } = require('../models');

const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log('user aqui req.user', req.user);

    const { email } = req.user;

    const user = await Users.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });

    return res.status(201).json({ title, content, userId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong... create new post' });
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
    res.status(400).json({ msg: 'Something wrong... get all posts' });
  }
};

const getPostById = async (req, res) => {
  console.log('id', req.params.id);

  try {
    const post = await Posts.findByPk(req.params.id, {
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });

    if (!post) return res.status(404).json({ msg: 'Post não existe' });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong on get Post ById' });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Posts.findByPk(req.params.id);

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
  }
};

const removePost = async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });

    if (!post) return res.status(400).json({ message: 'Post não existe' });

    if (post.dataValues.userId !== req.user.id) {
      res.status(401).json({ message: 'Usuário não autorizado' });
    }
    await Posts.destroy({ where: { id: req.params.id } });
    res.status(204).json({ msg: 'post deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong on delete' });
  }
};

module.exports = { getAllPosts, createNewPost, getPostById, removePost, updatePost };
