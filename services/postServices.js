const { Posts, Users } = require('../models');
const { postMessages } = require('../utils/messages');
const { validatePost } = require('../utils/newPostValidation');

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

module.exports = {
  findAPost,
  listPosts,
  newPostValidation,
};
