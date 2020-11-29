const { Users } = require('../models');
const { createToken } = require('../service');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const emailExistOrNot = await Users.findOne({ where: { email } });

    if (emailExistOrNot) return res.status(409).json({ message: 'Usuário já existe' });

    await Users.create({ displayName, email, password, image });

    const token = createToken({ email, password });

    return res.status(201).json(token);
  } catch (err) {
    console.err('createUser', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

module.exports = { createUser };
