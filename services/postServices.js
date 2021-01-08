const dataPostValidation = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ message: '"Title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"Content" is required' });
  }

  return next();
};

module.exports = { dataPostValidation };
