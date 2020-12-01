const router = require('express').Router();
const { User } = require('../models');
const validation = require('../middlewares/validations');
const createToken = require('../middlewares/createToken');

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

module.exports = router;
