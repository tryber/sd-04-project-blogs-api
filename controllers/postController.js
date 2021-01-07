const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { Posts, Users } = require('../models');
const usersWithouPass = require('../utils/userWithoutPass');

const router = express.Router();

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const posts = await Posts.findAll();
    const users = await Users.findAll();
    const postUser = posts.map(({
      id,
      title,
      published,
      updated,
      content,
      userId,
    }) => {
      const user = users.filter((userFiltered) => userFiltered.id === userId);
      return ({ id,
        title,
        published,
        updated,
        content,
        user: usersWithouPass(user)[0],
      });
    });
    console.log(postUser);
    res.status(200).json(postUser);
  } catch (err) {
    res.status(500).send(`Um erro enesperado aconteceu:${err}`);
  }
});

module.exports = router;
