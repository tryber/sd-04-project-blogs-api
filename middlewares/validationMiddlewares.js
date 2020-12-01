const allValidations = require('../utils/validations');

const validate = (name) => (req, _res, next) => {
  allValidations[`${name}Validation`](req.body);
  next();
};

module.exports = validate;
