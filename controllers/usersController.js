const router = require('express').Router();
const validations = require('../middlewares/usersValidation');
const { Users } = require('../models');
const { createToken, validateToken } = require('../services/auth');

router.post(
  '/',
  validations.verifyName,
  validations.verifyEmail,
  validations.verifyPassword,
  validations.verifyUserExists,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;

      await Users.create({ displayName, email, password, image });

      const token = createToken({ email, password });

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'algo deu errado' });
    }
  },
);

router.get('/',
  validateToken,
  async (_req, res) => {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  });

module.exports = router;
