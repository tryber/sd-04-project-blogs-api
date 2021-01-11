const { createJWT } = require('../auth/createJWT');
const { User } = require('../models');

const login = ('/', async (req, res) => {
  const { email } = req.body;
  try {
    const emailValidation = await User.findOne({ where: { email } });
    if (emailValidation) {
      const usrToken = createJWT(emailValidation.dataValues);
      return res.status(200).json({ usrToken });
    }
    return res.status(400).json({ message: 'Campos inválidos' });
  } catch (error) {
    return res.status(400).json({ message: error.message.slice(18) });
  }
});

module.exports = login;
