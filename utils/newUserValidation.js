const { messages } = require('./messages');

const EMAIL_PATTERN = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

const validateName = (name) => name && name.length >= 8 && typeof name === 'string';

const validateEmail = (email) => EMAIL_PATTERN.test(email);

const validatePass = (pass) => pass && pass.length === 6;

const validateUser = ({ displayName, email, password /* image */ }) => {
  if (!validateName(displayName)) {
    return messages.userErrorName;
  }
  if (!email) {
    return messages.userErrorEmailDoesntExist;
  }
  if (!validateEmail(email)) {
    return messages.userErrorEmail;
  }
  if (!password) {
    return messages.userErrorPasswordDoesntExist;
  }
  if (!validatePass(password)) {
    return messages.userErrorPassword;
  }
};

module.exports = validateUser;
