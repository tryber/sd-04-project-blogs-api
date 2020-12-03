const { Posts } = require('../models');

const createPostController = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const result = await Posts.create({ title, content, userId: id });
  return res.status(201).json(result);
};

module.exports = {
  createPostController,
};
