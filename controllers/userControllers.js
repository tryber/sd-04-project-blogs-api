const { Users } = require('../models');

const getAll = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
}

const addOne = async (req, res) => {
  try {
    const { body } = req;
    const user = await Users.create(body);

  } catch (error) {
    
  }
}

module.exports = {
  getAll,
  addOne,
}