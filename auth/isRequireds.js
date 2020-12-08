const isRequireds = ({ email, password }, res) => {
  if (!email || !password) {
    return !email
      ? res.status(400).json({ message: '"email" is required' })
      : res.status(400).json({ message: '"password" is required' });
  }
  return true;
};

module.exports = isRequireds;
