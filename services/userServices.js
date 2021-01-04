const { Users } = require('../models');
const emailValidator = require("email-validator");

const userValidation = async (req, res, next) => {
  const { email } = req.body;
  const user = Users.findOne({
    where: email,
  });
  if (user) {
    return res.status(409).json({ message: "Usuário já existe" });
  }
  return next();
};

const nameValidation = (req, res, next) => {
  const { displayName } = req.body;

  const messageError = (message) = res.status(400).json({ message })

  if (displayName.length < 8) {
    return messageError("\"displayName\" length must be at least 8 characters long");
  };

  return next();
};

const passValidation = (req, res, next) => {
  const { password } = req.body;

  const messageError = (message) = res.status(400).json({ message });

  if (!password) {
    return messageError("\"password\" is required");
  };

  if (password.length < 6) {
    return messageError("\"password\" length must be at least 8 characters long");
  };
  return next();
};


const emailValidation = (req, res, next) => {
  const { email } = req.body;

  const messageError = (message) = res.status(400).json({ message });

  if (!email) {
    return messageError("\"email\" is required");
  };

  if (!emailValidator.validate(email)) {
    return messageError("\"email\" must be a valid email");
  };
  return next();
};

module.exports = {
  userValidation,
  nameValidation,
  passValidation,
  emailValidation,
};
