const Router = require('@koa/router');
const createUser = require('../../controllers/createUser');
const getUserSubscriptions = require('../../controllers/getUserSubscriptions');
const getUserHistory = require('../../controllers/getUserHistory');
const getUserVideos = require('../../controllers/getUserVideos');
const getUserInfo = require('../../controllers/getUserInfo');
const validatorMiddleware = require('../validatorMiddleware');

const usersRoute = new Router();

usersRoute.post(
  '/users',
  validatorMiddleware('createUser', (ctx) => ctx.request.body),
  async (ctx) => {
    const { name, email } = ctx.request.body;
    const { status, body } = await createUser(name, email);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users/:id/subscriptions',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  async (ctx) => {
    const { id } = ctx.params;
    const { limit } = ctx.request.query;
    const { status, body } = await getUserSubscriptions(id, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users/:id/history',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  async (ctx) => {
    const { id } = ctx.params;
    const { limit } = ctx.request.query;
    const { status, body } = await getUserHistory(id, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users/:id/videos',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  async (ctx) => {
    const { id } = ctx.params;
    const { limit } = ctx.request.query;
    const { status, body } = await getUserVideos(id, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users/:id',
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.params.id })),
  async (ctx) => {
    const { id } = ctx.params;
    const { status, body } = await getUserInfo(id);
    ctx.status = status;
    ctx.body = body;
  }
);
module.exports = usersRoute;
