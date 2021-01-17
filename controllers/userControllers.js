const { Users } = require('../models');

const getAll = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ where: { id } });

    if (!user) throw new Error('Usuário não existe');

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { email } = req.user;
    await Users.destroy({ where: { email } });

    res.status(204).json({ message: 'excluido' });
  } catch (error) {
    res.status(404).json({ message: 'nao pode ser excluido' });
  }
};

const showToken = async (req, res) => {
  try {
    const { body, token } = req;
    let STATUS = 200;

    if (Object.keys(body).length > 2) {
      await Users.create(body);
      STATUS = 201;
    }

    res.status(STATUS).json({ token });
  } catch (error) {
    res.status(404).json({ message: 'Alguem de errado, não esta certo' });
  }
};

module.exports = {
  getAll,
  getOne,
  deleteOne,
  showToken,
};
