const Joi = require('joi');
const logger = require('../helpers/logger');
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  userId: Joi.number().integer(),
}).with('name', 'email');

const validatorMiddleware = async (ctx, next) => {
  try {
    await schema.validateAsync({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      userId: ctx.request.query.userId,
    });
    await next();
  } catch (err) {
    logger.log({
      message: err,
      level: 'info',
    });
    ctx.throw(400, { error: err });
  }
};

module.exports = validatorMiddleware;
