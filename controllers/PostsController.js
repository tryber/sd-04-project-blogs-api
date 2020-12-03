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

module.exports = {
  createPostController,
  getAllPostsController,
};
