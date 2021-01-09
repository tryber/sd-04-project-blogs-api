const { User } = require('../models');
const auth = require('../middlewares/auth');
const { validateUser } = require('../services/userServices');

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const isNotValid = validateUser(displayName, email, password);
  if (isNotValid) return res.status(400).json({ message: isNotValid.message });

  const isThereEmail = await User.findOne({ where: { email } });

  if (isThereEmail) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await User.create({ displayName, email, password, image });

  const token = await auth.generateToken(user.dataValues);

  res.status(201).json({ token });
};

module.exports = {
  newUser,
};
