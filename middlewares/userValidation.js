module.exports = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  if (!('email' in req.body)) return res.status(400).json({ message: '"email" is required' });
  if (email.length === 0) return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!('password' in req.body)) return res.status(400).json({ message: '"password" is required' });
  if (password.length === 0) return res.status(400).json({ message: '"password" is not allowed to be empty' });

  return next();
};
