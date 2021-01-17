const express = require('express');
const { Users, Posts } = require('../model');
const { tokenValidation } = require('../service/tokenValidation');
const postsValidation = require('../middlewares/postsValidation');

const router = express.Router();

router.post(
  '/',
  tokenValidation,
  postsValidation.validateTitle,
  postsValidation.validateContent,
  async (req, res) => {
    const { email } = req.user;

    const { title, content } = req.body;

    const user = await Users.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  },
);

router.get('/', tokenValidation, async (_req, res) => {
  const allPosts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(allPosts);
});

router.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
});

router.put(
  '/:id',
  tokenValidation,
  postsValidation.validateTitle,
  postsValidation.validateContent,
  postsValidation.validatePostAuthor,
  async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;

    await Posts.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId });
  },
);

router.delete('/:id', tokenValidation, postsValidation.validatePostAuthor, async (req, res) => {
  await Posts.destroy({ where: { id: req.params.id } });

  return res.status(204).json({ message: 'Post deletado com sucesso' });
});

module.exports = router;
