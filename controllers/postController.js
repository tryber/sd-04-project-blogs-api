const { Posts, Users } = require('../models');

exports.get = async (_req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(posts);
};

// exports.getById = async (req, res) => {};

// exports.getByTerm = async (req, res) => {};

// exports.put = async (req, res) => {};

exports.post = async (req, res) => {
  const { email } = req.user;
  const { title, content } = req.body;

  const user = await Users.findOne({ where: { email } });
  const userId = user.dataValues.id;

  await Posts.create({ title, content, userId });
  return res.status(201).json({ title, content, userId });
};

// exports.delete = async (req, res) => {};
