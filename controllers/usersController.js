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

      const user = await Users.create({ displayName, email, password, image });

      const token = createToken({ id: user.dataValues.id, email, displayName, image });

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'algo deu errado' });
    }
  },
);

router.get('/', validateToken, async (_req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(user);
});

router.delete('/me', validateToken, async (req, res) => {
  const { email } = req.user;
  await Users.destroy({ where: { email } });
  return res.status(204).json({ message: 'Usuário deletado com sucesso' });
});

module.exports = router;
