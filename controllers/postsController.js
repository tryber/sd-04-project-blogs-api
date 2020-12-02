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

module.exports = {
  createPost,
  getAll,
};
