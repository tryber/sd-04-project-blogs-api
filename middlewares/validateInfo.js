const { userSchema } = require('../schema/schema');

const checkUser = async (user) => userSchema.validate(user);

const userErrorDealer = async (req, res, next) => {
  try {
    await checkUser(req.body);
    next();
  } catch (er) {
    console.log(er);
    res.status(400).json({ message: er.details[0].message });
  }
};

module.exports = { userErrorDealer };
