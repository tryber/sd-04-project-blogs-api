const { createToken } = require('../services/auth');

exports.post = async (req, res) => {
  const { email, password } = req.body;

  const token = createToken({ email, password });

  return res.status(200).json({ token });
};
