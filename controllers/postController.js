const { Post } = require('../models');
// const { postService } = require('../services');

const createPostController = async ({ body, user: { id } }, res) => {
  try {
    const { title, content, userId } = await Post.create(
      { title: body.title, content: body.content, userId: id },
    );

    return res.status(201).json({ title, content, userId });
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

module.exports = {
  createPostController,
};
