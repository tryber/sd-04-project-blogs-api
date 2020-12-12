const { User, Post } = require('../models');

const verifyTitle = async (req, res, next) => {
  const { title } = req.body;
  if (title === undefined) {
    return res.status(400).json({ message: '"title" is required' });
  }
  return next();
};

const verifyContent = async (req, res, next) => {
  const { content } = req.body;
  if (content === undefined) {
    return res.status(400).json({ message: '"content" is required' });
  }
  return next();
};

const verifyPostAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.user;

  const user = await User.findOne({ where: { email } });
  const post = await Post.findOne({ where: { id } });

  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  req.user = { ...req.user, userId: user.dataValues.id };

  return next();
};

module.exports = { verifyTitle, verifyContent, verifyPostAuthor };
