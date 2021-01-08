const EMAIL_PATTERN = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

const messages = {
  userErrorName: '"displayName" length must be at least 8 characters long',
};

const validateName = (name) => name && name.length >= 8 && typeof name === 'string';

const validateEmail = (email) => email && EMAIL_PATTERN.test(email);

const validatePass = (pass) => pass && pass.length === 6;

const validateUser = ({ displayName, email, password, image }) => {
  if (!validateName(displayName)) {
    return messages.userErrorName;
  }
  // if (validateEmail(email)) {}
  // if (validatePass(password)) {}
};

module.exports = validateUser;
