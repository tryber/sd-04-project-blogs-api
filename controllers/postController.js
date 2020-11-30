const { Router } = require('express');
const { Op } = require('sequelize');
const validateJWT = require('../auth/validateJWT');
const { Posts, Users } = require('../models');

const router = Router();

router.get('/search', validateJWT, async (req, res) => {
  const { q } = req.query;

  // Verifica se a busca foi passada vazia
  if (q.length === 0) {
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
  }

  // Busca query em Title e Content
  const postByQuery = await Posts.findAll({
    attributes: { exclude: ['userId'] },
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
    include: [
      {
        model: Users,
        as: 'user',
      },
    ],
  });

  res.status(200).json(postByQuery);
});

router.post('/', validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const { data } = req.user;

  // Verifica se title e contents estão vazios
  if (!title) {
    res.status(400).json({ message: '"title" is required' });
  }

  if (!content) {
    res.status(400).json({ message: '"content" is required' });
  }

  // Busca o id do usuario logado e insere na postagem
  const user = await Users.findOne({ where: { displayName: data } });
  const { id } = user;
  const posts = await Posts.create({ title, content, userId: id });

  res.status(201).json(posts);
});

router.get('/', validateJWT, async (req, res) => {
  // Busca os dados da tabela Post e faz JOIN com tabela Users
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

  // verifica se post esta vazio
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
