const { Users } = require('../models');

const createUser = async (req, res) => {
  console.log(Users)
  try {
    const { displayName, email, password, image } = req.body;
    const user = await Users.create({
      displayName,
      email,
      password,
      image,
    });
    res.status(201).json(user);
  } catch (e) {
    console.log(e.message)
    res.status(500).send(e.message);
  }
};

module.exports = {
  createUser,
};
