const { Post } = require('../models');
const { postService: { getPost, editPost, searchPost, deletePost } } = require('../services');

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

const getAllPostsController = async (_req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' });

    return res.status(200).json(posts);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const getPostController = async (req, res) => {
  try {
    const { message, id, title, content, published, updated, user } = await getPost(req.params.id);

    if (message) return res.status(404).json({ message });

    return res.status(200).json({ id, title, content, published, updated, user });
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const editPostController = async ({
  body: { title, content },
  params: { id },
  user: { id: userId },
}, res) => {
  try {
    const { status, message } = await editPost(title, content, id, userId);

    if (status === 404) return res.status(status).json({ message });

    if (status === 401) return res.status(status).json({ message });

    return res.status(status).json({ title, content, userId });
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const searchPostController = async ({ query: { q } }, res) => {
  try {
    const post = await searchPost(q);

    return res.status(200).json(post);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const deletePostController = async ({
  params: { id },
  user: { id: userId },
}, res) => {
  try {
    const { status, message } = await deletePost(id, userId);

    if (status === 404) return res.status(status).json({ message });

    if (status === 401) return res.status(status).json({ message });

    return res.status(status).end();
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostController,
  editPostController,
  searchPostController,
  deletePostController,
};
