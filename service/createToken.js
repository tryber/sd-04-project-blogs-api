const jwt = require('jsonwebtoken');
// O JWT te disponibiliza um token/hash/código criptografado que você pode enviar para uma API
// e validá-lo como preferir.

const secret = 'MinhaSenhaMuitoComplexa123';
// Apenas quem está de posse da chave pode criar, alterar e validar o token.

const createToken = (payload) => { // payload = dados pessoais do usuário
  const headers = { // O Header é um objeto JSON que define informações sobre o tipo do token
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);
  // A assinatura é a concatenação dos hashes gerados a partir do Header e Payload
  // usando base64UrlEncode, com uma chave secreta ou certificado RSA.

  return token;
};

module.exports = createToken;
