const { Router } = require('express');
const { Users } = require('../models');
const createToken = require('../services/createToken');
const {
  isEmailEmpty,
  isEmailRequired,
  isPasswordEmpty,
  passwordRequired,
} = require('../middlewares/usersValidation');

const router = Router();

router.post('/',
  isEmailEmpty,
  isEmailRequired,
  isPasswordEmpty,
  passwordRequired,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(`logincontroller: ${email}, ${password}`);

      const userOnDB = await Users.findOne({ where: { email } });

      if (!userOnDB) return res.status(400).json({ message: 'Campos inválidos' });

      const token = createToken({ email, password });

      return res.status(200).json({ token });
    } catch (e) {
      console.error('login', e.message);
      return res.status(400).json({ message: 'Campos inválidos' });
    }
  });

module.exports = router;
