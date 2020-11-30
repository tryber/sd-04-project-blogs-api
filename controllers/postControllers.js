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

module.exports = { createPosts, getAllPosts };
