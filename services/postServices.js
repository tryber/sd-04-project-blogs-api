const validatePost = (title, content) => {
  if (!title) return { message: '"title" is required' };

  if (!content) return { message: '"content" is required' };
};

module.exports = {
  validatePost,
};
