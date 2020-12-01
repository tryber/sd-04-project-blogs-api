const { Posts, Users } = require('../models');

exports.get = async (_req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(posts);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
};

exports.searchGet = async (req, res) => {
  const { q } = req.query;

  const posts = await Posts.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${q}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${q}%`,
          },
        },
      ],
    },
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return res.status(200).json(posts);
};

exports.put = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { userId } = req.user;

  await Posts.update({ title, content }, { where: { id } });
  return res.status(200).json({ title, content, userId });
};

exports.post = async (req, res) => {
  const { email } = req.user;
  const { title, content } = req.body;

  const user = await Users.findOne({ where: { email } });
  const userId = user.dataValues.id;

  await Posts.create({ title, content, userId });
  return res.status(201).json({ title, content, userId });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Posts.destroy({ where: { id } });
  return res.status(204).json({ message: 'Post deletado com sucesso' });
};
