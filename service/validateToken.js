const jwt = require('jsonwebtoken');
// O JWT te disponibiliza um token/hash/código criptografado que você pode enviar para uma API
// e validá-lo como preferir.

const secret = 'MinhaSenhaMuitoComplexa123';
// Apenas quem está de posse da chave pode criar, alterar e validar o token.

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;// 1

    if (!token) { // 2
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const data = jwt.verify(token, secret);// 3

    const { email } = data;

    req.user = { email }; // 4

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;

// 1 - Aquele token gerado anteriormente virá na requisição através do
// header Authorization em todas as rotas que queremos que
// sejam autenticadas.

// 2 - Caso o token não seja informado, simplesmente retornamos
// o código de status 401 - não autorizado.

// 3 - Através o método verify, podemos validar e decodificar o nosso JWT.
/*
  A variável data será um objeto equivalente ao seguinte:
  {
    userData: {
      _id: '5e54590ba49448f7e5fa73c0',
      username: 'italssodj',
      password: 'senha123'
    },
    iat: 1582587327,
    exp: 1584774714908
  }
 */

// 4 - O usuário existe! Colocamos ele em um campo no objeto res.
//  Dessa forma, o usuário estará disponível para outros middlewares que
//  executem em sequência ou para a callback que lida com a requisição.
