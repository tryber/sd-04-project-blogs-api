const router = require('express').Router();
const { User } = require('../models');
const validation = require('../middlewares/validations');
const createToken = require('../middlewares/createToken');

router.post(
  '/',
  validation.validLogin,
  validation.validEmail,
  validation.validPassword,
  async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'Campos inválidos' });
      }

      const {
        dataValues: { password: __, createdAt, updatedAt, ...data },
      } = user;
      const token = createToken(data);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Algo errado!', err });
    }
  }
);

module.exports = router;
