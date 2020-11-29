const titleRequired = async (req, res, next) => {
  const { title } = req.body;

  if (title) return next();

  return res.status(400).json({ message: '"title" is required' });
};

const contentRequired = async (req, res, next) => {
  const { content } = req.body;

  if (content) return next();

  return res.status(400).json({ message: '"content" is required' });
};

module.exports = {
  titleRequired,
  contentRequired,
};
