const { Router } = require('express');
// const { QueryTypes } = require('sequelize');
const { Post, sequelize } = require('../models');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

// Req. 6 - Sua aplicação deve ter o endpoint POST /post
// Req. 6 - Cria um post

router.post('/', validateToken, async (req, res) => {
  try {
    return res.status(201).json({});
  } catch (_e) {
    return res.status(500).json({ message: 'internal error' });
  }
});

module.exports = router;
