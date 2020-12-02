const { User } = require('../models');

const checkemail = async (req, res, next) => {
  req.body.email
    ? next()
    : res.status(400).json({ message: '"email" is required' });
};

module.exports = checkemail;
