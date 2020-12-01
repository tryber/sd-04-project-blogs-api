const { users } = require('../models');
const { createToken } = require('../service');

const createUserControl = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const userMail = await users.findOne({ where: { email } });
    if (userMail) return res.status(409).json({ message: 'Usuário já existe' });

    await users.create({ displayName, email, password, image });
    const token = createToken({ email, password });

    return res.status(201).json(token);
  } catch (err) {
    console.error('createUserControl', err.massage);
    return res.status(500).json({ massage: 'Error Intern' });
  }
};

module.exports = {
  createUserControl,
};
