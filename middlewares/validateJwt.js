const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'opensecret';

const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const decoded = jwt.verify(token, secret);
    const registeredMail = await User.findOne({ where: { email: decoded.data.email } });
    if (!registeredMail) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    req.user = registeredMail;

    next();
  } catch (er) {
    console.log(er);
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJwt;
