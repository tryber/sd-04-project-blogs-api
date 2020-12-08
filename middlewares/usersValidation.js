const jooi = require('joi');

const schema = jooi.object({
  displayName: jooi.string().min(8),
  email: jooi.string().email().required(),
  password: jooi.string().length(6).required(),
  image: jooi.string(),
});

const userValidation = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = schema.validate({
    displayName,
    email,
    password,
    image,
  });
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
};

module.exports = userValidation;
