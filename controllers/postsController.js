const rescue = require('express-rescue');
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

module.exports = {
  getAllPostsCont,
  createPostsCont,
  getPostByIdCont,
};
