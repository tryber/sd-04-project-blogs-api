const { Router } = require('express');

const { Op } = require('sequelize');

const validateToken = require('../auth/validateToken');

const { tokenValidation } = require('../middlewares/userValidations');

const {
  existingValues,
  existingId,
  userCheck,
} = require('../middlewares/postValidations');

const { Post, User } = require('../models');

const posts = Router();

posts.post('/', tokenValidation, existingValues, (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const { email } = validateToken(token);
  User.findOne({
    where: { email },
  }).then((user) =>
    Post.create({ title, content, userId: user.dataValues.id })
      .then((newPost) => {
        const { id, updated, published, ...all } = newPost.dataValues;
        return res.status(201).json(all);
      })
      .catch((error) => console.log(error)));
});

posts.get('/', tokenValidation, (_, res) => {
  Post.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    attributes: { exclude: ['userId'] },
  })
    .then((userPosts) => res.status(200).json(userPosts))
    .catch((error) => console.log(error));
});

posts.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  if (q.length === 0) {
    Post.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
      ],
      attributes: { exclude: ['userId'] },
    })
      .then((allPosts) => res.status(200).json(allPosts))
      .catch((error) => console.log(error));
  }
  await Post.findAll({
    where: {
      [Op.or]: [
        {
          title: { [Op.like]: `%${q}%` },
        },
        {
          content: { [Op.like]: `%${q}%` },
        },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    attributes: { exclude: ['userId'] },
  })
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log(error));
});

posts.get('/:id', tokenValidation, existingId, (req, res) => {
  const { id } = req.params;
  Post.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    attributes: { exclude: ['userId'] },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => console.log(error));
});

posts.put(
  '/:id',
  tokenValidation,
  userCheck,
  existingValues,
  async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    await Post.update(
      {
        title,
        content,
      },
      { where: { id } },
    );
    Post.findOne({
      where: { id },
      attributes: { exclude: ['id', 'password', 'published', 'updated'] },
    })
      .then((newPost) => res.status(200).json(newPost))
      .catch((error) => console.log(error));
  },
);

module.exports = posts;
