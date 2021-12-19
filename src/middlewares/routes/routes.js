const combineRouters = require('koa-combine-routers');
const healthRoute = require('./healthRoute');
const usersRoute = require('./usersRoute');

const router = combineRouters(healthRoute, usersRoute);

module.exports = router;
