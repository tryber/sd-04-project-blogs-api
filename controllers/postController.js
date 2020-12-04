const { Post, User } = require('../models');

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

const getAllPosts = async (_req, res) => {
  try {
    const foundPosts = await Post.findAll({
      include: { model: User, as: 'user' },
      attributes: { exclude: ['userId'] },
    });
    res.status(200).json(foundPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost = await Post.findOne({
      where: { id },
      include: { model: User, as: 'user' },
      attributes: { exclude: ['userId'] },
    });

    if (!foundPost) {
      return res.status(404).json({ message: 'Post não existe' });
    }

    res.status(200).json(foundPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { id: userId } = req.user;
    const { title, content } = req.body;

    const updatedPost = await Post.update(
      { title, content },
      { where: { id: postId, userId } },
    );

    if (!updatedPost[0]) throw new Error('ERR_USER_NOT_AUTHORIZED');

    res.status(200).json({ title, content, userId });
  } catch (err) {
    console.error(err);
    if (err.message === 'ERR_USER_NOT_AUTHORIZED') {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
