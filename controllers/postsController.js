const rescue = require('express-rescue');
const { postsServices } = require('../services');

const getAllPostsCont = rescue(async (_req, res) => {
  const allPosts = await postsServices.getAllPostsServ();

  return res.status(200).json(allPosts);
});

module.exports = {
  getAllPostsCont,
};
