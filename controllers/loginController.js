const { createJWT } = require('../auth');
const { Users } = require('../models');

const login = ('/', async (req, res) => {
  const { email } = req.body;
  try {
    const emailValidation = await Users.findOne({ where: { email } });
    if (emailValidation) {
      const usrToken = createJWT(emailValidation.dataValues);
      return res.status(200).json({ token: usrToken });
    }
    return res.status(400).json({ message: 'Campos inválidos' });
  } catch (err) {
    return res.status(400).json({ message: err.message.slice(18) });
  }
});

module.exports = login;
