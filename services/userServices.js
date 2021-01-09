const validateDisplayName = (displayName) => displayName.length >= 8;

const validateEmail = (email) => {
  const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return emailRegex.test(email);
};

const validatePassword = (password) => password.length >= 6;

const validateUser = (displayName, email, password) => {
  if (!validateDisplayName(displayName)) {
    return { message: '"displayName" length must be at least 8 characters long' };
  }

  if (!email) return { message: '"email" is required' };

  if (!password) return { message: '"password" is required' };

  if (!validateEmail(email)) return { message: '"email" must be a valid email' };

  if (!validatePassword(password)) return { message: '"password" length must be 6 characters long' };
};

module.exports = {
  validateUser,
};
