const logger = require('../helpers/Logger');

const loggerMiddleware = async (ctx, next) => {
  logger.log({
    message: `Req - Method: ${ctx.request.method}, Endpoint: ${ctx.request.url}`,
    level: 'info',
  });
  await next();
  logger.log({
    message: `Res - Method: ${ctx.request.method}, Endpoint: ${ctx.request.url}, Status: ${ctx.response.status}`,
    level: 'info',
  });
};

module.exports = loggerMiddleware;
