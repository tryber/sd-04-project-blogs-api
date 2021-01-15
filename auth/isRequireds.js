const isRequireds = (body, res) => {
  const data = Object.keys(body);
  if (data.length < 2 || data.length === 3) {
    return data.includes('password')
      ? res.status(400).json({ message: '"email" is required' })
      : res.status(400).json({ message: '"password" is required' });
  }
  const { email, password } = body;
  if (!email || !password) {
    return !email
      ? res.status(400).json({ message: '"email" is not allowed to be empty' })
      : res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  return true;
};
module.exports = isRequireds;

// const validator = (data, res) => {
//   const teste = Object.keys(data);
//   if (teste.length < 2 || teste.length === 3) {
//     return teste.includes('password')
//       ? res.status(400).json({ message: '"email" is required' })
//       : res.status(400).json({ message: '"password" is required' });
//   }
//   const { email, password } = data;
//   if (!email || !password) {
//     return !email
//       ? res.status(400).json({ message: '"email" is not allowed to be empty' })
//       : res.status(400).json({ message: '"password" is not allowed to be empty' });
//   }
//   return true;
// };
