const emailRegex = (email) => /\S+@\S+\.\S+/.test(email);

const validateName = (status, message) =>
  ({ body: { displayName } }, res, next) => {
    if (!displayName || displayName.length < 8) return res.status(status).json({ message });

    next();
  };

const validateEmail = (status, message) =>
  ({ body: { email } }, res, next) => {
    if (!email) return res.status(status).json({ message });

    next();
  };

const validateEmailRegex = (status, message) =>
  ({ body: { email } }, res, next) => {
    const regexVerify = emailRegex(email);

    if (!regexVerify) return res.status(status).json({ message });

    next();
  };

const validatePassword = (status, message) =>
  ({ body: { password } }, res, next) => {
    if (!password) return res.status(status).json({ message });

    next();
  };

const validatePasswordSize = (status, message) =>
  ({ body: { password } }, res, next) => {
    if (password.length < 6) return res.status(status).json({ message });

    next();
  };

module.exports = {
  validateName,
  validateEmail,
  validateEmailRegex,
  validatePassword,
  validatePasswordSize,
};
