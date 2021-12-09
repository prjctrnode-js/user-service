const axios = require('axios');

const getUserVideos = async (ctx) => {
  const { id } = ctx.request.query;
  const { limit } = ctx.request.query;
  ctx.body = {
    success: true,
    message: 'Success',
    data: await axios
      .get(process.env.VIDEO_SEVICE, {
        params: {
          id,
          limit
        }
      })
      .then((res) => res.data.data)
  };
};

module.exports = getUserVideos;
