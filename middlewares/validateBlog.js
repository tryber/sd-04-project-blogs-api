const { verify } = require('jsonwebtoken');
const { validateBlog } = require('./validateInputs');

const validateCreatBlog = async (req, res, next) => {
  const { title, content } = req.body;

  const verify = await validateBlog.validate({ title, content });
  if (verify.error) {
    return res.status(400).json({ message: verify.error.message });
  }

  next();
};

module.exports = validateCreatBlog;
