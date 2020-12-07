const { Router } = require('express');
const { Users } = require('../models');
const createToken = require('../services/createToken');
const {
  displayNameValidation,
  isEmailAlreadyRegistered,
  isEmailValid,
  isEmailEmpty,
  isEmailRequired,
  passwordLengthValidation,
  isPasswordEmpty } = require('../middlewares/usersValidation');

const router = Router();

// Listar todos usuários.
router.get('/', async (_req, res) => {
  try {
    console.log('aqui getall');
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    console.log(JSON.stringify(users));
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'internal error' });
  }
});

// cadastrar um novo usuário.
router.post('/',
  isEmailAlreadyRegistered,
  isEmailEmpty,
  isEmailRequired,
  isEmailValid,
  displayNameValidation,
  isPasswordEmpty,
  passwordLengthValidation,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      const token = createToken({ email, password });
      await Users.create({ displayName, email, password, image });
      return res.status(201).json(token);
    } catch (e) {
      console.error('createUser', e.message);
      return res.status(500).json({ message: 'Error Intern' });
    }
  });

module.exports = router;
