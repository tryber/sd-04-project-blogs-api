const { Post, User } = require('../models');

const validateToken = require('../auth/validateToken');

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

const userCheck = async (req, res, next) => {
  const postId = req.params.id;
  const token = req.headers.authorization;
  const { email } = validateToken(token);
  const chosenPost = await Post.findOne({
    where: { id: postId },
  });
  const loggedUser = await User.findOne({
    where: { email },
  });
  if (chosenPost.userId !== loggedUser.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  next();
};

module.exports = {
  existingValues,
  existingId,
  userCheck,
};
