const { Op } = require('sequelize');
const { Posts, Users } = require('../models');
const { postMessages } = require('../utils/messages');
const { validatePost } = require('../utils/newPostValidation');

const deletePostAction = async (id, { dataValues }) => {
  const post = await Posts.findByPk(id);
  if (!post) {
    return postMessages.postErrorPostDoesNotExist;
  }
  if (post.userId !== dataValues.id) {
    return postMessages.postErrorUserNotAllowed;
  }
  await Posts.destroy({ where: { id } });
};

const editAPostById = async (postId, postData, { dataValues }) => {
  const isPostInvalid = validatePost(postData);
  if (typeof isPostInvalid === 'string') {
    return isPostInvalid;
  }
  const { dataValues: { userId } } = await Posts.findByPk(postId);
  if (userId !== dataValues.id) {
    return postMessages.postErrorUserNotAllowed;
  }
  await Posts.update(postData, { where: { id: postId } });
  return { ...postData, userId: dataValues.id };
};

const findAPost = async (id) => {
  const result = await Posts.findAll({
    where: { id },
    include: [{ model: Users, as: 'user' }],
  });
  if (result.length) {
    return result[0];
  }
  return postMessages.postErrorPostDoesNotExist;
};

const listPosts = async () => {
  const postList = await Posts.findAll({
    include: [{ model: Users, as: 'user' }],
  });
  return postList;
};

const newPostValidation = async (payload, { dataValues }) => {
  const isPostInvalid = validatePost(payload);
  if (typeof isPostInvalid === 'string') {
    return isPostInvalid;
  }
  await Posts.create({ ...payload, userId: dataValues.id });
  return { ...payload, userId: dataValues.id };
};

const seachPostsByQuery = async (queryParam) => {
  if (queryParam === '') {
    return Posts.findAll({ include: [{ model: Users, as: 'user' }] });
  }
  return Posts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${queryParam}%` } },
        { content: { [Op.like]: `%${queryParam}%` } },
      ],
    },
    include: [{ model: Users, as: 'user' }],
  });
};

module.exports = {
  deletePostAction,
  editAPostById,
  findAPost,
  listPosts,
  newPostValidation,
  seachPostsByQuery,
};
