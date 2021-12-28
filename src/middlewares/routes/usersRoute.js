const Router = require('@koa/router');
const createUser = require('../../controllers/createUser');
const getUserSubscriptions = require('../../controllers/getUserSubscriptions');
const getUserHistory = require('../../controllers/getUserHistory');
const getUserVideos = require('../../controllers/getUserVideos');
const getUserInfo = require('../../controllers/getUserInfo');
const loginUser = require('../../controllers/loginUser');
const validatorMiddleware = require('../validatorMiddleware');
const isAuth = require('../isAuth');

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
  isAuth,
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.request.params.id })),
  async (ctx) => {
    const { id } = ctx.request.params;
    const { limit } = ctx.request.query;
    if (Number(id) !== Number(ctx.user.id)) {
      const error = { statusCode: 401, message: 'invalid userId' };
      throw error;
    }
    const { status, body } = await getUserSubscriptions(id, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users/:id/history',
  isAuth,
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.request.params.id })),
  async (ctx) => {
    const { id } = ctx.request.params;
    const { limit } = ctx.request.query;
    if (Number(id) !== Number(ctx.user.id)) {
      const error = { statusCode: 401, message: 'invalid userId' };
      throw error;
    }
    const { status, body } = await getUserHistory(id, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users/:id/videos',
  isAuth,
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.request.params.id })),
  async (ctx) => {
    const { id } = ctx.request.params;
    const { limit } = ctx.request.query;
    if (Number(id) !== Number(ctx.user.id)) {
      const error = { statusCode: 401, message: 'invalid userId' };
      throw error;
    }
    const { status, body } = await getUserVideos(id, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.get(
  '/users',
  isAuth,
  validatorMiddleware('getData', (ctx) => ({ userId: ctx.user.id })),
  async (ctx) => {
    const { id } = ctx.user;
    const { status, body } = await getUserInfo(id);
    ctx.status = status;
    ctx.body = body;
  }
);
usersRoute.post('/users/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const { status, body } = await loginUser(email, password);
  ctx.status = status;
  ctx.body = body;
});
usersRoute.get('/users/me', isAuth, async (ctx) => {
  if (ctx.user) {
    ctx.body = {
      success: true,
      data: { id: ctx.user.id, name: ctx.user.name, email: ctx.user.email }
    };
  }
});
module.exports = usersRoute;
