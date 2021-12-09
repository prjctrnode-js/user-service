const pJson = require('../../package.json');

const userHealth = async (ctx) => {
  ctx.set({ 'Content-Type': 'application/json' });
  ctx.status = 200;
  ctx.body = JSON.stringify({
    succes: true,
    message: `Name ${pJson.name}, verion ${pJson.version}`
  });
};

module.exports = userHealth;
