const Joi = require('joi');

const userSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validatePostData = (req, res, next) => {
  const postData = req.body;

  const validation = userSchema.validate(postData);

  if (validation.error) {
    return res.status(400).json({ message: validation.error.message });
  }

  next();
};

module.exports = validatePostData;
