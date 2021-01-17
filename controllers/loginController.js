const router = require('express').Router();
const { Users } = require('../models');
const validation = require('../middlewares/validations');
const createToken = require('../middlewares/createToken');

router.post(
  '/',
  validation.loginValidator,
  async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const token = createToken({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
