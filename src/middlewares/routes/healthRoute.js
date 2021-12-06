const Router = require('@koa/router');
const router = new Router();
const pJson = require('../../../package.json');

router.get('/users/health', async (ctx) => {
  ctx.set({ 'Content-Type': 'application/json' });
  ctx.status = 200;
  ctx.body = JSON.stringify({
    succes: true,
    message: `Name ${pJson.name}, verion ${pJson.version}`,
  });
});

module.exports = router;
