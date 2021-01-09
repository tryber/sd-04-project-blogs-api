const jwt = require('jsonwebtoken');
const Users = require('../models');
const jwtConfig = require('../utils/jwtConfig');
const { messages } = require('../utils/messages');

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: messages.userErrorTokenDoesNotExist });
  }
  try {
    const decoded = jwt.verify(token, jwtConfig.SECRET);
    const user = await Users.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res.status(401).json({ message: messages.userErrorUserNotFound });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: messages.userErrorTokenExpired });
  }
};

module.exports = auth;
