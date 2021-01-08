const { userServices } = require('../services');

const newUser = async (req, res) => {
  try {
    console.log(req.body);
    const response = await userServices.newUserValidation(req.body);
    if (typeof response === 'string') {
      return res.status(400).json({ message: response });
    }
    // res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  newUser,
};
