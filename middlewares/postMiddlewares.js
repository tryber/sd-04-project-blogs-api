const Joi = require('joi');

const POSTSCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).unknown(true);

const validateUserEntries = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = POSTSCHEMA.validate(body)

    if (error) throw new Error(error.details[0].message);

    next();
  } catch (error) {
    const { message } = error;

    return res.status(400).json({ message });
  }
};

module.exports = {
  validateUserEntries,
}