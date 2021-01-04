const isValidUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (displayName.length <= 8) res.status(400).json({ message: 'displayName length must be at least 8 characters' });
  if (emailRegex.test(email)) res.status(400).json({ message: 'email must be a valid email' });
  if (email) res.status(400).json({ message: 'email is required' });
  if (password.length >= 6) res.status(400).json({ message: 'password length must be at least 6 characters' });

  next();
};

module.exports = {
  isValidUser,
};
