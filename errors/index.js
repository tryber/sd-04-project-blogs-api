const INVALID_ENTRIES = { code: 400, message: 'Campos inválidos' };
const USER_ALREADY_EXISTS = { code: 409, message: 'Usuário já existe' };
const MISSING_TOKEN = { code: 401, message: 'Token não encontrado' };
const INVALID_TOKEN = { code: 401, message: 'Token expirado ou inválido' };
const USER_NOT_FOUND = { code: 404, message: 'Usuário não existe' };
const POST_NOT_FOUND = {code: 404, message: 'Post não existe'};

module.exports = {
  INVALID_ENTRIES,
  USER_ALREADY_EXISTS,
  MISSING_TOKEN,
  INVALID_TOKEN,
  USER_NOT_FOUND,
  POST_NOT_FOUND,
};
