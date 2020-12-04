const express = require('express');
const { postErrorDealer } = require('../middlewares/validateInfo');
const validateJwt = require('../middlewares/validateJwt');
const { Post, User } = require('../models');

const router = express.Router();
// https://sequelize.org/v5/manual/querying.html
router.get('/', validateJwt, async (req, res) => {
  const postsList = await Post.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });
  res.status(200).json(postsList);
});

router.post('/', validateJwt, postErrorDealer, async (req, res) => {
  const { data } = req.user;
  const userId = data.dataValues.id;
  const { title, content } = req.body;
  const post = await Post.create({ title, content, userId });
  res.status(201).json(post);
});

router.get('/:id', validateJwt, async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });
  if (post === null) {
    res.status(404).json({ message: 'Post não existe' });
  }
  res.status(200).json(post);
});

router.put('/:id', validateJwt, postErrorDealer, async (req, res) => {
  try {
    const { data } = req.user;
    const { title, content } = req.body;
    const userLogId = data.dataValues.id;
    const paramsId = req.params.id;

    const post = await Post.findByPk(paramsId);

    if (post.userId === userLogId) {
      await Post.update({ title, content }, { where: {id: paramsId } });
      const editedPost = await Post.findByPk(paramsId);
      res.status(200).json(editedPost);
    }
    res.status(401).json({ message: 'Usuário não autorizado' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', validateJwt, async (req, res) => {
  try {
    const { data } = req.user;
    const userLogId = data.dataValues.id;
    const paramsId = req.params.id;
    const post = await Post.findByPk(paramsId, {
      attributes: { exclude: ['userId'] },
      include: { model: User, as: 'user' },
    });
    if (post.user.id === userLogId) {
      await User.destroy({ where: { id: paramsId } });
      res.status(204).json();
    }
    res.status(401).json({ message: 'Usuário não autorizado' });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: 'Post não existe' });
  }
});

module.exports = router;
