const allValidations = require('../services/validations');

const validate = (name) => (req, _res, next) => {
  allValidations[`${name}Validation`](req.body);
  next();
};

module.exports = validate;
