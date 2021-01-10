const validations = require('../helpers/joi');

const validate = (name) => (req, _res, next) => {
  validations[`${name}Validation`](req.body);
  next();
};

module.exports = validate;
