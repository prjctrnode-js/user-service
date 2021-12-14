const db = require('../db/models');
const request = require('../helpers/request');

const getUserInfo = async (ctx) => {
  const { id } = ctx.params;
  const user = await db.Users.findOne({
    where: {
      id
    }
  });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: 'user is not found' };
    return;
  }
  const subscriptions = await request(
    process.env.SUBSCRIPTIONS_SERVICE,
    'GET',
    {
      userId: id
    }
  );
  const video = await request(process.env.VIDEO_SEVICE, 'GET', {
    userId: id
  });
  const history = await request(process.env.HISTORY_SERVICE, 'GET', {
    userId: id
  });
  ctx.body = {
    success: true,
    message: 'Success',
    data: {
      user,
      subscriptions: subscriptions.data,
      video: video.data,
      history: history.data
    }
  };
};

module.exports = getUserInfo;
