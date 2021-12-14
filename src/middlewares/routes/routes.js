const combineRouters = require('koa-combine-routers');
const Router = require('@koa/router');
const usersHealth = require('../../controllers/usersHealth');
const createUser = require('../../controllers/createUser');
const getUserSubscriptions = require('../../controllers/getUserSubscriptions');
const getUserHistory = require('../../controllers/getUserHistory');
const getUserVideos = require('../../controllers/getUserVideos');
const getUserInfo = require('../../controllers/getUserInfo');
const validatorMiddleware = require('../validatorMiddleware');

const healthRoute = new Router();
const usersRoute = new Router();

healthRoute.get('/users/health', usersHealth);
usersRoute.post(
  '/users',
  validatorMiddleware('createUser', (ctx) => ctx.request.body),
  createUser
);
usersRoute.get(
  '/users/:id/subscriptions',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  getUserSubscriptions
);
usersRoute.get(
  '/users/:id/history',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  getUserHistory
);
usersRoute.get(
  '/users/:id/videos',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  getUserVideos
);
usersRoute.get(
  '/users/:id',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  getUserInfo
);

const router = combineRouters(healthRoute, usersRoute);

module.exports = router;
