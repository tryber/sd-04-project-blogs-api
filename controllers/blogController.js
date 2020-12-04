const rescue = require('express-rescue');
const { findUserByEmail, getDate } = require('../services');
const { BlogPost, User } = require('../models');

const createPost = rescue(async (req, res) => {
  try {
    // header da requisição http
    const { title, content } = req.body;

    // // Obtên o id do usuário logado
    const reqEmail = req.user.email;
    const userEmail = await findUserByEmail(reqEmail);
    const { id } = await userEmail.toJSON();
    const userId = id;

    // Obtên a data e hora da criação do Post
    const published = await getDate();
    const updated = await getDate();

    // Criando o Post no banco
    const Post = await BlogPost.create({
      title,
      content,
      userId,
      published,
      updated,
    });

    return res.status(201).json(Post);
  } catch (error) {
    return res.status(400).json({ message: 'Algo deu errado.' });
  }
});

const getAllPostsUser = rescue(async (req, res) => {
  const { email } = req.user;
  const userEmail = await findUserByEmail(email);
  const { id } = await userEmail.toJSON();
  const userId = id;
  console.log(userId);

  const allPost = await BlogPost.findAll({
    where: { id: userId },
    include: [{ model: User, as: 'user' }],
  });

  return res.status(200).json(allPost);
});

const getPostById = rescue(async (req, res) => {
  const postId = await BlogPost.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    ],
  });

  if (!postId) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(postId);
});

module.exports = { createPost, getAllPostsUser, getPostById };
