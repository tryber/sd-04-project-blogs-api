const { Posts } = require('../models');

const createPost = async (req, res) => {
  try {
    const { user } = req;
    const { title, content } = req.body;
    const post = await Posts.create({
      title,
      content,
      userId: user.id,
    });
    res.status(201).json(post);
  } catch(e) {
    res.status(401).send(e.message)
  }
};

module.exports = {
  createPost,
};
