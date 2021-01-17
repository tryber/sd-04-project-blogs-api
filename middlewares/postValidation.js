const createMessageJSON = (message) => ({ message });

module.exports = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json(createMessageJSON('"title" is required'));
  }

  if (!content) {
    return res.status(400).json(createMessageJSON('"content" is required'));
  }

  return next();
};
