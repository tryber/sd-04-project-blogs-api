const rescue = require('express-rescue');
const { Post } = require('../models');
const { postsServices } = require('../services');

const getAllPostsCont = rescue(async (_req, res) => {
  const allPosts = await postsServices.getAllPostsServ();

  return res.status(200).json(allPosts);
});

const createPostsCont = rescue(async (req, res) => {
  const { title, content } = req.body;

  const { dataValues } = await postsServices.createPostsServ(title, content, req.user.id);
  const { id, updated, published, ...post } = dataValues;

  return res.status(201).json(post);
});

const getPostByIdCont = rescue(async (req, res) => {
  const { id } = req.params;
  const postId = await postsServices.getPostByIdServ(id);
  if (postId.length <= 0) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(postId[0]);
});

const updatePostCont = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { id: userId } = req.user;

  const { user } = await Post.findByPk(id, { include: 'user' });
  if (!user) return res.status(404).json({ message: 'Post não existe' });

  if (userId !== user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  const updatePost = await postsServices.updatePostServ(title, content, id, userId);
  return res.status(200).json(updatePost);
});

const deletePostCont = rescue(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return res.status(404).json({ message: 'Post não existe' });

  if (userId !== post.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await postsServices.deletePostServ(id, userId);

  return res.status(204).end();
});

const searchTermPostCont = rescue(async (req, res) => {
  const { q: term } = req.query;

  const result = await postsServices.searchTermPostServ(term);

  return res.status(200).json(result);
});

module.exports = {
  getAllPostsCont,
  createPostsCont,
  getPostByIdCont,
  updatePostCont,
  deletePostCont,
  searchTermPostCont,
};
