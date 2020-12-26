const { Post } = require('../models');

const existingValues = (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const existingId = (req, res, next) => {
  const { id } = req.params;
  Post.findOne({
    where: { id },
  })
    .then((post) => {
      if (post === null) {
        return res.status(404).json({ message: 'Post não existe' });
      }
    })
    .catch((error) => console.log(error));
  next();
};

module.exports = {
  existingValues,
  existingId,
};
