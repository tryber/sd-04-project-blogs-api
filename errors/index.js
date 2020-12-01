const INVALID_ENTRIES = { code: 400, message: 'Campos inválidos' };
const USER_ALREADY_EXISTS = { code: 409, message: 'Usuário já existe' };
const MISSING_TOKEN = { code: 401, message: 'Token não encontrado' };
const INVALID_TOKEN = { code: 401, message: 'Token expirado ou inválido' };

module.exports = { INVALID_ENTRIES, USER_ALREADY_EXISTS, MISSING_TOKEN, INVALID_TOKEN };
