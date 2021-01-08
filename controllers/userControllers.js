const { userServices } = require('../services');

const newUser = async (req, res) => {
  try {
    const response = await userServices.newUserValidation(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  newUser,
};
