const { User, Posts } = require('../models');
const { validatePost } = require('../services/postServices');

const newPost = async (req, res) => {
  const { title, content } = req.body;

  const isNotValid = validatePost(title, content);
  if (isNotValid) return res.status(400).json({ message: isNotValid.message });

  const { email } = req.user;

  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  await Posts.create({ title, content, userId });

  return res.status(201).json({ title, content, userId });
};

const getPosts = async (_req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(posts);
};

const findPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { email } = req.user;

  const isNotValid = validatePost(title, content);
  if (isNotValid) return res.status(400).json({ message: isNotValid.message });

  const user = await User.findOne({ where: { email } });

  const post = await Posts.findOne({ where: { id } });

  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  const { userId } = post.dataValues;

  await Posts.update({ title, content }, { where: { id } });

  return res.status(200).json({ title, content, userId });
};

module.exports = {
  newPost,
  getPosts,
  findPostById,
  editPost,
};
