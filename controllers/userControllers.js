const { Users } = require('../models');

const getAll = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addOne = async (req, res) => {
  try {
    const { body, token } = req;
    await Users.create(body);

    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ messa: 'Alguem de errado, não esta certo' });
  }
};

module.exports = {
  getAll,
  addOne,
};
