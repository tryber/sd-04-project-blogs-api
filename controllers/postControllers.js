const { Posts } = require('../models');

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

module.exports = {
  addPost,
};
