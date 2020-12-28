const { Users, Posts } = require('../models');

const create = async (req, res) => {
  const { title, content } = req.body;
  const user = await Users.findOne({ where: { email: req.user } });

  if (!user) {
    return res.status(404).json({ message: 'usuário nãop encontrado' });
  }

  try {
    await Posts.create({ title, content, userId: user.id });

    return res.status(201).json({ title, content, userId: user.id });
  } catch (error) {
    return res.status(204).json({ message: 'Erro ao criar usuário' });
  }
};

// const getAll = async (req, res) => {
//   const users = await Users.findAll();

//   return res.status(200).json(users);
// };

// const getUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await Users.findOne({ where: { id } });

//   if (!user) {
//     return res.status(404).json({ message: 'Usuário não existe' });
//   }

//   return res.status(200).json(user);
// };

// const deleteActualUser = async (req, res) => {
//   const userEmail = req.user;
//   const user = await Users.findOne({ where: { email: userEmail } });

//   if (!user) {
//     return res.status(404).json({ message: 'usuário nãop encontrado' });
//   }

//   user.destroy();
//   return res.status(204).send();
// };

module.exports = { create }; // , getAll, getUser, deleteActualUser };
