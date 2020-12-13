const { Posts, User } = require('../models');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.data;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  await Posts.create({ title, content, userId });

  return res.status(201).json({ title, content, userId });
};

const read = async (_req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { email } = req.data;
  const user = await User.findOne({ where: { email } });
  const post = await Posts.findOne({ where: { id } });

  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  const { userId } = post.dataValues;

  await Posts.update({ title, content }, { where: { id } });

  return res.status(200).json({ title, content, userId });
};

const del = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id } });
  const name = req.data.displayName;
  console.log(name)

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  const user = await User.findOne({ where: { displayName: name } });

  if (post.userId !== user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await User.destroy({ where: { id } });

  return res.status(204).json({ message: 'Post deletado' });
};

module.exports = {
  create,
  findById,
  read,
  update,
  del,
};
