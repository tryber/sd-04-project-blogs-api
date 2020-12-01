const rescue = require('express-rescue');
const { Users } = require('../models');

const findUser = rescue(async (req, _res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } }) || {};
  req.user = user.dataValues;
  next();
});

module.exports = findUser;
