const jooi = require('joi');

const schema = jooi.object({
  title: jooi.string().required(),
  content: jooi.string().required(),
});

const postsValidation = async (req, res, next) => {
  const { title, content } = req.body;

  const { error } = schema.validate({
    title,
    content,
  });

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
};

module.exports = postsValidation;
