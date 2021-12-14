const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required()
});
const getData = Joi.object({
  userId: Joi.number().integer().required()
});

module.exports = {
  createUser,
  getData
};
