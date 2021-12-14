const axios = require('axios');
const db = require('../db/models');

const getUserVideos = async (ctx) => {
  const { id } = ctx.params;
  const { limit } = ctx.request.query;
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
  const { data } = await axios.get(`${process.env.VIDEO_SEVICE}?userId=${id}`, {
    params: {
      limit
    }
  });
  ctx.body = {
    success: true,
    message: 'Success',
    data: data.data
  };
};

module.exports = getUserVideos;
