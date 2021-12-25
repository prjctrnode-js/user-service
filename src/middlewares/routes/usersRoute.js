const Router = require('@koa/router');
const createUser = require('../../controllers/createUser');
const getUserSubscriptions = require('../../controllers/getUserSubscriptions');
const getUserHistory = require('../../controllers/getUserHistory');
const getUserVideos = require('../../controllers/getUserVideos');
const getUserInfo = require('../../controllers/getUserInfo');
const loginUser = require('../../controllers/loginUser');
const validatorMiddleware = require('../validatorMiddleware');

const usersRoute = new Router();

usersRoute.post(
  '/users',
  validatorMiddleware('createUser', (ctx) => ctx.request.body),
  async (ctx) => {
    const { name, email, password } = ctx.request.body;
    const { status, body } = await createUser(name, email, password);
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
usersRoute.get('/users/me');
usersRoute.post('/users/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const { status, body } = await loginUser(email, password);
  ctx.status = status;
  ctx.body = body;
});
module.exports = usersRoute;
