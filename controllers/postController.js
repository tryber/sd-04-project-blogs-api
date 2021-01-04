const { Posts, Users } = require('../models');

const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const { email } = req.user;

    const user = await Users.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });

    return res.status(201).json({ title, content, userId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong...' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong...' });
  }
};

module.exports = { getAllPosts, createNewPost };
