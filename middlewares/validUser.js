const displayNameValid = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length >= 8) return next();

  return res
    .status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
};

const emailValid = async (req, res, next) => {
  const { email } = req.body;

  if (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email)) return next();

  return res.status(400).json({ message: '"email" must be a valid email' });
};

const emailEmpty = async (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  return next();
};

const emailRequired = async (req, res, next) => {
  const { email } = req.body;

  if (email) return next();

  return res.status(400).json({ message: '"email" is required' });
};

const passwordValid = async (req, res, next) => {
  const { password } = req.body;

  if (/^(\d|\w){6,}$/.test(password)) return next();

  return res.status(400).json({ message: '"password" length must be 6 characters long' });
};

const passwordEmpty = async (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  return next();
};

const passwordRequired = async (req, res, next) => {
  const { password } = req.body;

  if (password) return next();

  return res.status(400).json({ message: '"password" is required' });
};

module.exports = {
  displayNameValid,
  emailRequired,
  emailValid,
  emailEmpty,
  passwordEmpty,
  passwordValid,
  passwordRequired,
};
