const { Post } = require('../models');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const {
      title: postTitle,
      content: postContent,
      userId,
    } = await Post.create({
      title,
      content,
      userId: id,
    });
    res.status(201).json({ title: postTitle, content: postContent, userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  createPost,
};
