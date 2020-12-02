const { userSchema, loginSchema } = require('../schema/schema');

const checkUser = async (user) => userSchema.validate(user);
const checkLogin = async (user) => loginSchema.validate(user);

const userErrorDealer = async (req, res, next) => {
  try {
    await checkUser(req.body);
    if (req.body.password.length >= 6) {
      next();
    } else {
      res.status(400).json({ message: '"password" length must be 6 characters long' });
    }
  } catch (er) {
    console.log(er);
    res.status(400).json({ message: er.details[0].message });
  }
};

const loginErrorDealer = async (req, res, next) => {
  try {
    await checkLogin(req.body);
    if (req.body.email.length === 0) {
      res.status(400).json({ message: '"email" is not allowed to be empty' });
    } else if (req.body.password.length === 0) {
      res.status(400).json({ message: '"password" is not allowed to be empty' });
    } else {
      next();
    }
  } catch (er) {
    console.log(er);
    res.status(400).json({ message: er.details[0].message });
  }
};

module.exports = { userErrorDealer, loginErrorDealer };
