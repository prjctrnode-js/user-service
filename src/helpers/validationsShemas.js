const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).max(9).required()
});
const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).max(9).required()
});
const getData = Joi.object({
  userId: Joi.number().integer().required()
});

module.exports = {
  createUser,
  login,
  getData
};
