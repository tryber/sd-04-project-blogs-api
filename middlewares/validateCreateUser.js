const inputs = require('./validateInputs');

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validations = inputs.validate({ displayName, email, password });

  if (validations.error) {
    return res.status(400).json({ message: validations.error.message });
  }

  next();
};

module.exports = validateCreateUser;
