const router = require('express').Router();
const { Users } = require('../models');
const validation = require('../middlewares/validations');
const createToken = require('../middlewares/createToken');
const auth = require('../middlewares/auth');

router.post('/',
  validation.displayNameValidator,
  validation.emailValidator,
  validation.passwordValidator,
  validation.uniqueEmailValidator,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      const user = await Users.create({ displayName, email, password, image });
      const { dataValues: { password: _, createdAt, updatedAt, ...data } } = user;
      const token = createToken(data);
      return res.status(201).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Algo errado!', err });
    }
  });

router.get('/:id', auth,
  async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: req.params.id } });

      if (!user) {
        return res.status(404).send({ message: 'Usuário não existe' });
      }

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).json({ message: 'Algo errado!', err });
    }
  });

router.get('/', auth,
  async (_req, res) => {
    const users = await Users.findAll();
    try {
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: 'Algo errado!', err });
    }
  });

router.delete('/me', auth,
  async (req, res) => {
    const { email } = req.user;
    await Users.destroy({ where: { email } });
    return res.status(204).send();
  });

module.exports = router;
