const { postServices } = require('../services');

const newPost = async (req, res) => {
  try {
    const response = await postServices.newPostValidation(req.body, req.user);
    if (typeof response === 'string') {
      throw new Error(response);
    }
    res.status(201).json(response);
  } catch (error) {
    console.log('Caiu no catch: ', error.message);
    return res.status(400).json({ message: error.message });
  }
};
// const newPost = async (req, res) => {
//   try {
//     const response = await userServices.newUserValidation(req.body);
//     if (typeof response === 'string' && response !== messages.userErrorUserAlreadyExists) {
//       throw new Error(response);
//     }
//     if (typeof response === 'string') {
//       return res.status(409).json({ message: response });
//     }
//     res.status(201).json(response);
//   } catch (error) {
//     console.log('Caiu no catch: ', error.message);
//     return res.status(400).json({ message: error.message });
//   }
// };

module.exports = {
  newPost,
};
