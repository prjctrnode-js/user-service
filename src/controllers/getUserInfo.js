const db = require('../db/models');
const request = require('../helpers/request');

const getUserInfo = async (id) => {
  const user = await db.Users.findOne({
    where: {
      id
    }
  });
  if (!user) {
    const error = {
      statusCode: 400,
      message: 'user is not found'
    };
    throw error;
  }
  const subscriptions = await request(
    `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}/${process.env.GATEWAY_SUBSCRIPTIONS_PATH}`,
    'GET',
    {
      userId: id
    }
  );
  const video = await request(
    `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}/${process.env.GATEWAY_VIDEO_PATH}`,
    'GET',
    {
      userId: id
    }
  );
  const history = await request(
    `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}/${process.env.GATEWAY_HISTORY_PATH}`,
    'GET',
    {
      userId: id
    }
  );
  return {
    status: 200,
    body: {
      success: true,
      message: 'Success',
      data: {
        user,
        subscriptions: subscriptions.data,
        video: video.data,
        history: history.data
      }
    }
  };
};

module.exports = getUserInfo;
