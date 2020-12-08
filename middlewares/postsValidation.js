const { Users, Posts } = require('../models');

const titleRequired = async (req, res, next) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  next();
};

const contentRequired = async (req, res, next) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: '"content" is required' });

  next();
};

const postOwnerValidation = async (req, res, next) => {
  const { email } = req.user;
  const { id } = req.params;

  const user = await Users.findOne({ where: { email } });

  const post = await Posts.findOne({
    where: { id },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  if (post.dataValues.userId === user.dataValues.id) return next();

  return res.status(401).json({ message: 'Usuário não autorizado' });
};

module.exports = {
  titleRequired,
  contentRequired,
  postOwnerValidation,
};
