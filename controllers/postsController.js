const router = require('express').Router();
const { Users, Posts } = require('../models');
const validation = require('../middlewares/validations');
const auth = require('../middlewares/auth');

router.post('/', auth,
  validation.postValidator,
  async (req, res) => {
    const { email } = req.user;
    const { title, content } = req.body;
    const user = await Users.findOne({ where: { email } });
    const userId = user.dataValues.id;
    await Posts.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  });

router.get('/', auth,
  async (_req, res) => {
    const pagePosts = await Posts.findAll({
      include: [{
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    return res.status(200).json(pagePosts);
  });

router.get('/:id', auth,
  async (req, res) => {
    const { id } = req.params;
    const userPost = await Posts.findOne({
      where: { id },
      include: { model: Users, as: 'user' },
      atributes: { exclude: ['userId'] },
    });

    if (!userPost) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    return res.status(200).json(userPost);
  });

router.put('/:id',
  auth,
  validation.postValidator,
  validation.authorValidator,
  async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;

    await Posts.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId });
  });

router.delete('/:id', auth,
  validation.authorValidator,
  async (req, res) => {
    await Posts.destroy({ where: { id: req.params.id } });
    return res.status(204).json({ message: 'Post deletado com sucesso' });
  });

module.exports = router;
