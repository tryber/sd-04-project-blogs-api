const { validateUser } = require('./validateInputs');

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const verify = await validateUser.validate({ displayName, email, password });
  if (verify.error) {
    // console.log(verify);
    return res.status(400).json({ message: verify.error.message });
  }
  next();
};

module.exports = validateCreateUser;
