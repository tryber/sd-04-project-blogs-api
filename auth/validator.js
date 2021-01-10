const validator = (req, res) => {
  const reqKeys = Object.keys(req);
  if (!reqKeys.includes('password')) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!reqKeys.includes('email')) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const { email, password } = req;
  if (email === '') {
    req.emptyEmail = true;
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    req.emptyPass = true;
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }

  return false;
};

module.exports = validator;
