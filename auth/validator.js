const validator = (req, res) => {
  const reqKeys = Object.keys(req);
  if (reqKeys.length < 2 || reqKeys.length === 3) {
    return reqKeys.includes('password')
      ? res.status(400).json({ message: '"email" is required' })
      : res.status(400).json({ message: '"password" is required' });
  }
  const { email, password } = req;
  if (!email || !password) {
    return !email
      ? res.status(400).json({ message: '"email" is not allowed to be empty' })
      : res
        .status(400)
        .json({ message: '"password" is not allowed to be empty' });
  }

  return true;
};

module.exports = validator;
