const validateTitle = (status, message) =>
  ({ body: { title } }, res, next) => {
    if (typeof title === 'undefined') return res.status(status).json({ message });

    next();
  };

const validateContent = (status, message) =>
  ({ body: { content } }, res, next) => {
    if (typeof content === 'undefined') return res.status(status).json({ message });

    next();
  };

module.exports = {
  validateTitle,
  validateContent,
};
