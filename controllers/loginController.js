const router = require('express').Router();
const validation = require('../middlewares/validations');
const createToken = require('../middlewares/createToken');

router.post(
  '/',
  validation.emailValidator,
  validation.passwordValidator,
  validation.uniqueEmailValidator,
  validation.loginValidator,
  async (req, res) => {
    const { email, password } = req.body;
    const token = createToken({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
