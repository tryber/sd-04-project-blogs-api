const { userService: { createUser } } = require('../services');

const createUserController = async ({ body }, res) => {
  try {
    const newUser = await createUser(body);

    console.log('User Controller:', newUser);

    if (newUser.message) return res.status(409).json(newUser);

    return res.status(201).json(newUser);
  } catch (_err) {
    return res.status(500).json({ message: 'Unknow error' });
  }
};

module.exports = {
  createUserController,
};
