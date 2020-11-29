const rescue = require('express-rescue');
const { postsServices } = require('../services');

const getAllPostsCont = rescue(async (_req, res) => {
  const allPosts = await postsServices.getAllPostsServ();

  return res.status(200).json(allPosts);
});

const createPostsCont = rescue(async (req, res) => {
  const { title, content } = req.body;
  // const { id } = req.user;
  const { dataValues } = await postsServices.createPostsServ(title, content, req.user.id);

  const { id, updated, published, ...post } = dataValues;
  // delete dataValues.id;
  // delete dataValues.updated;
  // delete dataValues.published;

  return res.status(201).json(post);
});

module.exports = {
  getAllPostsCont,
  createPostsCont,
};
