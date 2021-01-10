const validator = (req, res, next) => {
  const reqKeys = Object.keys(req.body);
  if (!reqKeys.includes('password')) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!reqKeys.includes('email')) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const { email, password } = req.body;
  if (email === '') {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }
  req.isValidField = true;
  next();
};

module.exports = validator;
