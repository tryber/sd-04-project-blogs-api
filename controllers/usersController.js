const usersController = require('express').Router();
const { Users } = require('../models');
const { validateName, validateEmail, validatePassword } = require('../middlewares/userValidations');
const { createToken, validateToken } = require('../authentication');

const createMessageJSON = (message) => ({ message });

usersController.post('/', validateName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const createdUser = await Users.create({ displayName, email, password, image });
    const token = createToken(createdUser.dataValues);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'algo deu errado' });
  }
});

usersController.get('/', validateToken, async (_, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
});

usersController.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json(createMessageJSON('Usuário não existe'));
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

usersController.delete('/me', validateToken, async (req, res) => {
  const { id, email } = req.user;
  try {
    await Users.destroy({ where: { email, id } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

module.exports = usersController;
