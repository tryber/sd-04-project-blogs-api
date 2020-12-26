const { Router } = require('express');

const validateToken = require('../auth/validateToken');

const { tokenValidation } = require('../middlewares/userValidations');

const { existingValues } = require('../middlewares/postValidations');

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

module.exports = posts;
