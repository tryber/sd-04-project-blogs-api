const { postServices } = require('../services');
const { postMessages } = require('../utils/messages');

const deletePost = async (req, res) => {
  try {
    const response = await postServices.deletePostAction(Number(req.params.id), req.user);
    if (typeof response === 'string' && response === postMessages.postErrorUserNotAllowed) {
      return res.status(401).json({ message: response });
    }
    if (typeof response === 'string') {
      return res.status(404).json({ message: response });
    }
    res.status(204).json();
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const response = await postServices.editAPostById(Number(req.params.id), req.body, req.user);
    if (typeof response === 'string' && response === postMessages.postErrorUserNotAllowed) {
      return res.status(401).json({ message: response });
    }
    if (typeof response === 'string') {
      return res.status(400).json({ message: response });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const response = await postServices.findAPost(Number(req.params.id));
    if (typeof response === 'string') {
      return res.status(404).json({ message: response });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const response = await postServices.listPosts();
    res.status(200).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const newPost = async (req, res) => {
  try {
    const response = await postServices.newPostValidation(req.body, req.user);
    if (typeof response === 'string') {
      throw new Error(response);
    }
    res.status(201).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  deletePost,
  editPost,
  getPostById,
  getAllPosts,
  newPost,
};
