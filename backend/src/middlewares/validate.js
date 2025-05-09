const Joi = require('joi');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    return next(
      new ApiError(
        httpStatus.BAD_REQUEST,
        error.details.map((x) => x.message).join(', ')
      )
    );
  }
  Object.assign(req, value);
  return next();
};
module.exports = validate;
