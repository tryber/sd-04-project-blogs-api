const { Posts, Users } = require('../models');
// const { removePassword } = require('../utils/messages');
const { validatePost } = require('../utils/newPostValidation');

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
  listPosts,
  newPostValidation,
};
