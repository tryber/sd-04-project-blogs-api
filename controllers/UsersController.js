const { Users } = require('../models');
const createToken = require('../auth/createToken');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Users.findOne({ email, password });
    const { password: _, ...userData } = result;
    const token = createToken(userData);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const createUsersController = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await Users.create({ displayName, email, password, image });
    const { password: _, ...userData } = result;
    const token = createToken(userData);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUsersController,
  loginController,
};
