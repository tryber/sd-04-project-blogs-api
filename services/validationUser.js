const Empty = 'have a default value';
const alreadyExists = 'Validation error';
const nameWrong = 'Validation error: Validation len on displayName failed';
const passwordLength = 'len on password';
const isNotEmail = 'Validation error: Validation isEmail on email failed';

const validationUser = (message) => {
  switch (true) {
    case message === nameWrong:
      return { message: '"displayName" length must be at least 8 characters long', code: 400 };
    case message === isNotEmail:
      return { message: '"email" must be a valid email', code: 400 };
    case message.includes(Empty && 'email'):
      return { message: '"email" is required', code: 400 };
    case message.includes(passwordLength):
      return { message: '"password" length must be 6 characters long', code: 400 };
    case message.includes(Empty && 'password'):
      return { message: '"password" is required', code: 400 };
    case message === alreadyExists:
      return { message: 'Usuário já existe', code: 409 };
    default:
      break;
  }
};

module.exports = validationUser;
