const { User } = require('../models');

const emailIsValid = (email) => {
  const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

  if (regex.test(email)) return true;

  return false;
};

const userExist = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return true;

  return false;
};

module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }

  if (!email) {
    return res.status(400).json(
      { message: '"email" is required' },
    );
  }

  if (!emailIsValid(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (!password) {
    return res.status(400).json(
      { message: '"password" is required' },
    );
  }

  if (password.length < 6) {
    return res.status(400).json(
      { message: '"password" length must be 6 characters long' },
    );
  }

  if (await userExist(email))
  return res.status(409).json({ message: 'Usuário já existe' })

  next()
};