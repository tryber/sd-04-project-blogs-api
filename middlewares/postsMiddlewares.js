const verifyTitleCreate = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).send({ message: '"title" is required' });
  }
  next();
};

const verifyContentCreate = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    res.status(400).send({ message: '"content" is required' });
  }
  next();
};

module.exports = {
  verifyTitleCreate,
  verifyContentCreate,
};
