module.exports = (req, res, next) => {
  const {
    content, title,
  } = req.body;

  if (!('content' in req.body)) return res.status(400).json({ message: '"content" is required' });
  if (content.length === 0) return res.status(400).json({ message: '"content" is not allowed to be empty' });
  if (!('title' in req.body)) return res.status(400).json({ message: '"title" is required' });
  if (title.length === 0) return res.status(400).json({ message: '"title" is not allowed to be empty' });

  return next();
};
