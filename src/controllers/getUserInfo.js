const db = require('../db/models');
const request = require('../helpers/request');

const getUserInfo = async (id) => {
  const user = await db.Users.findOne({
    where: {
      id
    }
  });
  if (!user) {
    return {
      status: 404,
      body: { success: false, message: 'user is not found' }
    };
  }
  const subscriptions = await request(
    'http://127.0.0.1:3008/subscriptions',
    'GET',
    {
      userId: id
    }
  );
  const video = await request('http://127.0.0.1:3008/videos', 'GET', {
    userId: id
  });
  const history = await request('http://127.0.0.1:3008/history', 'GET', {
    userId: id
  });
  return {
    status: 200,
    body: {
      success: true,
      message: 'Success',
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        subscriptions: subscriptions.data,
        video: video.data,
        history: history.data
      }
    }
  };
};

module.exports = getUserInfo;
