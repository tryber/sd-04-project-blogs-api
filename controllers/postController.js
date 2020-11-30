const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const { Posts, Users } = require('../models');

const router = Router();

router.post('/', validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const { data } = req.user;

  if (!title) {
    res.status(400).json({ message: '"title" is required' });
  }

  if (!content) {
    res.status(400).json({ message: '"content" is required' });
  }

  const user = await Users.findOne({ where: { displayName: data } });
  const { id } = user;
  const posts = await Posts.create({ title, content, userId: id });

  res.status(201).json(posts);
});

router.get('/', validateJWT, async (req, res) => {
  const posts = await Posts.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: Users,
        as: 'user',
      },
    ],
  });
  res.status(200).json(posts);
});

router.get('/:id', validateJWT, async (req, res) => {
  const posts = await Posts.findAll({
    where: { id: req.params.id },
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: Users,
        as: 'user',
      },
    ],
  });

  if (!posts[0]) {
    res.status(404).json({ message: 'Post não existe' });
  }
  res.status(200).json(posts[0]);
});

router.put('/:id', validateJWT, async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    res.status(400).json({ message: '"title" is required' });
  }

  if (!content) {
    res.status(400).json({ message: '"content" is required' });
  }

  // Pesquisa o usuario logado
  const user = await Users.findOne({ where: { displayName: req.user.data } });

  // Pesquisa o Post chamado na URL
  const oldPost = await Posts.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['published', 'updated'] },
  });

  // Compara userId do post com id do usuario logado
  if (oldPost.userId !== user.id) {
    res.status(401).json({ message: 'Usuário não autorizado' });
  }

  // Atualiza o post
  await Posts.update({ title, content }, { where: { id: req.params.id } });

  // Retorna o post atualizado
  const newPost = await Posts.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['published', 'updated'] },
  });

  res.status(200).json(newPost);
});

router.delete('/:id', validateJWT, async (req, res) => {
  // Localiza o Post
  const postById = await Posts.findOne({
    where: { id: req.params.id },
  });
  // Verifica se o Post existe
  if (!postById) {
    res.status(404).json({ message: 'Post não existe' });
  }
  // Localiza o usuario logado
  const user = await Users.findOne({ where: { displayName: req.user.data } });

  // Verifica se o usuario logado é o mesmo que criou o post
  if (postById.userId !== user.id) {
    res.status(401).json({ message: 'Usuário não autorizado' });
  }

  // Deleta o Post
  await Posts.destroy({ where: { id: req.params.id } });
  res.status(204).json();
});

module.exports = router;
