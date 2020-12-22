const { Router } = require('express');
const { Posts, sequelize } = require('../models');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

// Req. 6 - Cria um post
router.post('/', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user.dataValues;
    console.log('TITLE: ', title);
    console.log('CONTENT: ', content);
    console.log('USERID: ', id);
    const published = new Date();
    const updated = new Date();
    // validações
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
    const newPost = await Posts.create({ title, content, userId: id, published, updated });
    console.log('NEWPOST: ', newPost);
    return res.status(201).json(newPost);
  } catch (e) {
    console.log('ERRO: ', e);
    return res.status(500).json({ message: 'internal error' });
  }
});

module.exports = router;
