const { userServices } = require('../services');
const { messages } = require('../utils/messages');

const deleteUser = async (req, res) => {
  try {
    await userServices.eraseUserData(req.user);
    res.status(204).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const response = await userServices.findAUser(Number(req.params.id));
    if (typeof response === 'string') {
      throw new Error(response);
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const listAllUsers = async (_req, res) => {
  try {
    const response = await userServices.listUsers();
    res.status(200).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
  }
};

const makeUserLoggedIn = async (req, res) => {
  try {
    const response = await userServices.loginValidation(req.body);
    if (typeof response === 'string') {
      throw new Error(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const newUser = async (req, res) => {
  try {
    const response = await userServices.newUserValidation(req.body);
    if (typeof response === 'string' && response !== messages.userErrorUserAlreadyExists) {
      throw new Error(response);
    }
    if (typeof response === 'string') {
      return res.status(409).json({ message: response });
    }
    res.status(201).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  deleteUser,
  getOneUser,
  listAllUsers,
  makeUserLoggedIn,
  newUser,
};
