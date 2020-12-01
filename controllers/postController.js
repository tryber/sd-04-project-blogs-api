const { Posts } = require('../models');
const { User } = require('../models');
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

module.exports = {
  newPost,
};
