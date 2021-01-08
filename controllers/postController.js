const rescue = require('express-rescue');
const postService = require('../services/postService');

const create = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const newUPost = await postService.create(title, content, id);

  res.status(201).json(newUPost);
});

const edit = rescue(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;

  const user = await postService.edit(title, content, id, userId);

  res.status(200).json(user);
});

const all = rescue(async (req, res) => {
  const users = await postService.all();

  res.status(200).json(users);
});

const viewOne = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await postService.viewOne(id);

  res.status(200).json(user);
});

const search = rescue(async (req, res) => {
  const { q: query } = req.query;

  if (!query) {
    return all(req, res);
  }

  const post = await postService.search(query);

  res.status(200).json(post);
});

/* const delUser = rescue(async (req, res) => {
  const { id } = req.user;
  await userService.delUser(id);

  res.status(204).json();
}); */

module.exports = { create, all, viewOne, edit, search };
