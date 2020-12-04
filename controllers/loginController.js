const { User } = require('../models');
const authenticate = require('../auth/authentication');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      res.status(400).json({ message: 'Campos inválidos' });
    }

    const token = await authenticate.login(email, password);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  login,
};
