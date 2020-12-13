const { User } = require('../models');
const { auth } = require('../middlewares');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const token = await auth.createToken(user.dataValues);

  res.status(201).json({ token });
};

module.exports = {
  create,
};
