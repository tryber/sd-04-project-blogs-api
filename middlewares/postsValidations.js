const checkTitle = async (req, res, next) => {
  const { title } = req.body;
  if (title === undefined) {
    return res.status(400).json({ message: '"title" is required' });
  }
  return next();
};

const checkContent = async (req, res, next) => {
  const { content } = req.body;
  if (content === undefined) {
    return res.status(400).json({ message: '"content" is required' });
  }
  return next();
};

module.exports = { checkTitle, checkContent };
