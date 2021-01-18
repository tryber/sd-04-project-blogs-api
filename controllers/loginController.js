const router = require('express').Router();
const { createToken } = require('../services/auth');
const validations = require('../middlewares/loginValidations');

router.post(
  '/',
  validations.verifyEmail,
  validations.verifyPassword,
  validations.verifyUserExists,
  async (req, res) => {
    const token = createToken(req.user);

    return res.status(200).json({ token });
  },
);

module.exports = router;
