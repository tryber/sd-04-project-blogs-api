const { Posts, Users } = require('../models');

const createPosts = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { email } = req.user;

    const user = await Users.findOne({ where: { email } });

    const post = await Posts.create({ userId: user.id, title, content });

    return res.status(201).json({
      title: post.title,
      content: post.content,
      userId: post.userId,
    });
  } catch (err) {
    console.error('createPosts', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await Posts.findAll({
      include: { model: Users, as: 'user' },
      attributes: { exclude: ['userId'] },
    });

    return res.status(200).json(allPosts);
  } catch (err) {
    console.error('getAllPosts', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findOne({
      where: { id },
      include: { model: Users, as: 'user' },
      attributes: { exclude: ['userId'] },
    });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    return res.status(200).json(post);
  } catch (err) {
    console.error('getPostById', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    await Posts.update({ title, content }, { where: { id } });

    const updatedPost = await Posts.findOne({
      where: { id },
      attributes: { exclude: ['id', 'published', 'updated'] },
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error('updatePostById', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    await Posts.destroy({ where: { id } });

    return res.status(204).end();
  } catch (err) {
    console.error('deletePostById', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

module.exports = { createPosts, getAllPosts, getPostById, updatePostById, deletePostById };
