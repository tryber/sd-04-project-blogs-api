const { Router } = require('express');
const { Users } = require('../models');
const createToken = require('../services/createToken');
const {
  displayNameValidation,
  isEmailValid,
  isEmailEmpty,
  isEmailRequired,
  passwordLengthValidation,
  isPasswordEmpty,
  passwordRequired, } = require('../middlewares/usersValidation');

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
  isPasswordEmpty,
  passwordRequired,
  isEmailRequired,
  passwordLengthValidation,
  isEmailEmpty,
  isEmailValid,
  displayNameValidation,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;

      const emailAlreadyRegistered = await Users.findOne({ where: { email } });
      if (emailAlreadyRegistered) return res.status(409).json({ message: 'Usuário já existe' });

      const token = createToken({ email, password });
      await Users.create({ displayName, email, password, image });

      return res.status(201).json(token);
    } catch (e) {
      console.error('createUser', e.message);
      return res.status(500).json({ message: 'Error Intern' });
    }
  });

module.exports = router;
