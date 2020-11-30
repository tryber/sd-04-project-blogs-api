const { User } = require('../models');
const authenticate = require('../auth/authentication');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    await User.create({
      displayName,
      email,
      password,
      image,
    });

    const token = await authenticate.login(email, password);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getUser = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ where: { email } });
  res.status(200).json(foundUser);
};

module.exports = {
  createUser,
  getUser,
};
