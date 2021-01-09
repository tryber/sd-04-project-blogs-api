const { userServices } = require('../services');
const { messages } = require('../utils/messages');

const newUser = async (req, res) => {
  try {
    const response = await userServices.newUserValidation(req.body);
    if (typeof response === 'string' && response !== messages.userErrorUserAlreadyExists) {
      throw new Error(response);
      // return res.status(400).json({ message: response });
    }
    if (typeof response === 'string') {
      return res.status(409).json({ message: response });
    }
    res.status(201).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  newUser,
};
