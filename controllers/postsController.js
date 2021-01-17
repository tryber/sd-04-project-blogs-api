const router = require('express').Router();
const { Op } = require('sequelize');
const { validateToken } = require('../services/auth');

const { Posts, Users } = require('../models');
const verifyFields = require('../middlewares/postsValidations');

router.post('/',
  validateToken,
  verifyFields,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.user;
      const newPost = await Posts.create({ title, content, userId: id });
      return res.status(201).json(newPost);
    } catch (_err) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  });

router.get('/',
  validateToken,
  async (_req, res) => {
    try {
      const posts = await Posts.findAll({
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        attributes: { exclude: ['userId'] },
      });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });

router.get('/search',
  validateToken,
  async (req, res) => {
    try {
      const { q: searchValue } = req.query;
      const posts = await Posts.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchValue}%` } },
            { content: { [Op.like]: `%${searchValue}%` } },
          ],
        },
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        attributes: { exclude: ['userId'] },
      });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });

router.get('/:id',
  validateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Posts.findOne({
        where: { id },
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        attributes: { exclude: ['userId'] },
      });

      if (!post) return res.status(404).json({ message: 'Post não existe' });

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });

router.put('/:id',
  validateToken,
  verifyFields,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const { id } = req.params;
      const updatedPost = await Posts.update(
        { title, content, userId },
        { where: { id, userId } },
      );
      if (updatedPost[0] === 0) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }

      const postUpdated = await Posts.findOne({
        where: { id },
      });
      return res.status(200).json(postUpdated);
    } catch (_err) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  });

router.delete('/:id',
  validateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Posts.findOne({ where: { id } });
      if (!post) return res.status(404).json({ message: 'Post não existe' });

      const deletedPost = await Posts.destroy({ where: { id, userId } });
      if (deletedPost === 0) return res.status(401).json({ message: 'Usuário não autorizado' });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  });
module.exports = router;
