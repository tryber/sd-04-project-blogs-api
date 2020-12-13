const { User } = require('../models');

const userExist = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  return user;
};

module.exports = async (req, res, next) => {
  const { email, password: pwd } = req.body;

  if (email === undefined) return res.status(400).json({ message: '"email" is required' });

  if (!email) return res.status(400).json({ message: '"email" is not allowed to be empty' });

  if (pwd === undefined) return res.status(400).json({ message: '"password" is required' });

  if (!pwd) return res.status(400).json({ message: '"password" is not allowed to be empty' });

  const user = await userExist(email, pwd);

  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  req.data = user;

  next();
};
