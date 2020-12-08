const jooi = require('joi');

const schema = jooi.object({
  email: jooi.string().email().required(),
  password: jooi.string().required(),
});

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  next();
};

module.exports = loginValidation;
