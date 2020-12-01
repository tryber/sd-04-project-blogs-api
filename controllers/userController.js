const router = require('express').Router();
const { User } = require('../models');
const validation = require('../middlewares/validations');
const createToken = require('../middlewares/createToken');
const auth = require('../middlewares/auth');

router.post(
  '/',
  validation.validDisplayName,
  validation.validEmail,
  validation.validPassword,
  validation.emailIsUnique,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      const user = await User.create({ displayName, email, password, image });
      const {
        dataValues: { password: __, createdAt, updatedAt, ...data },
      } = user;
      const token = createToken(data);
      return res.status(201).json({ token });
      // retorna USER, mas deve retornar TOKEN
    } catch (err) {
      return res.status(500).json({ message: 'Algo errado!', err });
    }
  },
);

router.get('/', auth, async (_req, res) => {
  const users = await User.findAll();
  try {
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Algo errado!', err });
  }
});

router.get('/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  try {
  if(!user){
    return res.status(404).json({message: 'Usuário não existe'})
  }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Algo errado!', err });
  }
});

module.exports = router;
