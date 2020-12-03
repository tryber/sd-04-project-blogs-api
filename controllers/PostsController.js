const { Posts, Users } = require('../models');

const createPostController = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const result = await Posts.create({ title, content, userId: id });
  return res.status(201).json(result);
};

const getAllPostsController = async (req, res) => {
  const allPosts = await Posts.findAll({ include: { model: Users, as: 'user' } });
  return res.status(200).json(allPosts);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id }, include: { model: Users, as: 'user' } });
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  return res.status(200).json(post);
};

module.exports = {
  createPostController,
  getAllPostsController,
  getByIdController,
};
