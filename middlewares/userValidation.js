const validator = require('validator');

module.exports = (req, res, next) => {
  const {
    displayName, email, password,
  } = req.body;

  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });

  const err = {
    displayName: false, email: false, password: false,
  };

  const errMsg = {
    displayName: '"displayName" length must be at least 8 characters long',
    email: '"email" must be a valid email',
    password: '"password" length must be 6 characters long',
  };

  err.email = !validator.isEmail(email);
  err.password = !validator.isLength(password.toString(), { min: 6 });
  err.displayName = !validator.isLength(displayName, { min: 8 }) || !validator.isAlpha(displayName);

  Object.keys(err).forEach((key) => {
    if (err[key]) return res.status(400).json({ message: errMsg[key] });
  });

  return next();
};
