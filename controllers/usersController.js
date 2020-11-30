const { UsersModel } = require('../models');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await UsersModel.create({
      displayName,
      email,
      password,
      image,
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};


module.exports = {
  createUser,
};
