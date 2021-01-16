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
    console.log(error.message);
    res.status(400).json({ message: 'bad status' });
  }
};

module.exports = {
  addPost,
  getPost,
};
