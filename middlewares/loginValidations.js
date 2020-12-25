const existingValues = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    res.status(400).json({ message: '"password" is required' });
  }
  next();
};

const emptyValue = (req, res, next) => {
  const { email, password } = req.body;
  if (email.length === 0) {
    res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password.length === 0) {
    res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

module.exports = {
  existingValues,
  emptyValue,
};
