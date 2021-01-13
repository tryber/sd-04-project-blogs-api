const postValidation = ({ title, content }, res) => {
  if (!title || !content) {
    return !title
      ? res.status(400).json({ message: '"title" is required' })
      : res.status(400).json({ message: '"content" is required' });
  }
};

module.exports = postValidation;
