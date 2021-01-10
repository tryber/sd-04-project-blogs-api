const { Posts } = require('../models');
const { validatePost } = require('../utils/newPostValidation');

const newPostValidation = async (payload, { dataValues }) => {
  const isPostInvalid = validatePost(payload);
  if (typeof isPostInvalid === 'string') {
    return isPostInvalid;
  }
  await Posts.create({ ...payload, userId: dataValues.id });
  return { ...payload, userId: dataValues.id };
};

module.exports = {
  newPostValidation,
};
