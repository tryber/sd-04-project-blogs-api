const createMessage = (message) => ({ message });

const verifyFields = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json(createMessage('"title" is required'));
  }

  if (!content) {
    return res.status(400).json(createMessage('"content" is required'));
  }

  return next();
};

module.exports = verifyFields;
