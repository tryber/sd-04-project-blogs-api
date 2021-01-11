const { postMessages } = require('./messages');

const validatePost = ({ title, content }) => {
  if (!title) {
    return postMessages.postErrorTitleDoesNotExist;
  }
  if (!content) {
    return postMessages.postErrorContentDoesNotExist;
  }
};

module.exports = {
  validatePost,
};
