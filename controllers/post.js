const { Users, Posts } = require('../models');

const create = async (req, res) => {
  const { title, content } = req.body;
  const user = await Users.findOne({ where: { email: req.user } });

  if (!user) {
    return res.status(404).json({ message: 'usuário nãop encontrado' });
  }

  try {
    await Posts.create({ title, content, userId: user.id });

    return res.status(201).json({ title, content, userId: user.id });
  } catch (error) {
    return res.status(204).json({ message: 'Erro ao criar usuário' });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await Posts.findAll({ include: 'user' });

  return res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id }, include: 'user' });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
};

// const deleteActualUser = async (req, res) => {
//   const userEmail = req.user;
//   const user = await Users.findOne({ where: { email: userEmail } });
//   if (!user) {
//     return res.status(404).json({ message: 'usuário nãop encontrado' });
//   }
//   user.destroy();
//   return res.status(204).send();
// };

module.exports = { create, getAllPosts, getPost }//, deleteActualUser };
