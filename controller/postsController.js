const { Posts, Users } = require('../models');

const createPostsControl = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const user = await Users.findOne({ where: { email } });
  const post = await Posts.create({ userId: user.id, title, content });

  return res.status(201).json({
    title: post.title,
    content: post.content,
    userId: post.userId,
  });
};

const listAllPostControl = async (req, res) => {
  const allPosts = await Posts.findAll({
    include: { model: Users, as: 'user' },
    atributes: { exclude: ['userId'] },
  });

  return res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({
    where: { id },
    include: { model: Users, as: 'user' },
    atributes: { exclude: ['userId'] },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(post);
};

module.exports = {
  createPostsControl,
  listAllPostControl,
  getPostById,
};
