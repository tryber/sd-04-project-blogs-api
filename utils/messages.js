const messages = {
  userErrorName: '"displayName" length must be at least 8 characters long',
  userErrorEmailDoesntExist: '"email" is required',
  userErrorEmail: '"email" must be a valid email',
  userErrorPasswordDoesntExist: '"password" is required',
  userErrorPassword: '"password" length must be 6 characters long',
  userErrorUserAlreadyExists: 'Usuário já existe',
  userErrorTokenDoesNotExist: 'Token não encontrado',
  userErrorTokenExpired: 'Token expirado ou inválido',
  userErrorUserNotFound: 'User not found!',
  userErrorEmailEmpty: '"email" is not allowed to be empty',
  userErrorPasswordEmpty: '"password" is not allowed to be empty',
  userErrorInvalidLogin: 'Campos inválidos',
  userErrorUserDoesNotExist: 'Usuário não existe',
};

const postMessages = {
  postErrorTitleDoesNotExist: '"title" is required',
  postErrorContentDoesNotExist: '"content" is required',
};

const removePassword = (payload) => {
  const { password: _, ...withoutPass } = payload;
  return withoutPass;
};

module.exports = {
  messages,
  postMessages,
  removePassword,
};
