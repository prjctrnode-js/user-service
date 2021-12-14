const combineRouters = require('koa-combine-routers');
const Router = require('@koa/router');
const usersHealth = require('../../controllers/usersHealth');
const createUser = require('../../controllers/createUser');
const getUserSubscriptions = require('../../controllers/getUserSubscriptions');
const getUserHistory = require('../../controllers/getUserHistory');
const getUserVideos = require('../../controllers/getUserVideos');
const getUserInfo = require('../../controllers/getUserInfo');

const healthRoute = new Router();
const usersRoute = new Router();

healthRoute.get('/users/health', usersHealth);
usersRoute.post('/users', createUser);
usersRoute.get('/users/:id/subscriptions', getUserSubscriptions);
usersRoute.get('/users/:id/history', getUserHistory);
usersRoute.get('/users/:id/videos', getUserVideos);
usersRoute.get('/users/:id', getUserInfo);

const router = combineRouters(healthRoute, usersRoute);

module.exports = router;
