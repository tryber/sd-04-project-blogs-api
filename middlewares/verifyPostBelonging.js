const { Posts, Users } = require('../models');

const verifyPostBelonging = async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.user;

  const user = await Users.findOne({ where: { email } });

  const post = await Posts.findOne({
    where: { id },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  if (post.dataValues.userId === user.dataValues.id) return next();

  return res.status(401).json({ message: 'Usuário não autorizado' });
};

module.exports = verifyPostBelonging;
