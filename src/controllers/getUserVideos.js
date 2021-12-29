const axios = require('axios');
const db = require('../db/models');

const getUserVideos = async (id, limit) => {
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
  const { data } = await axios.get(
    `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}/${process.env.GATEWAY_VIDEO_PATH}`,
    {
      params: {
        limit,
        userId: id
      }
    }
  );
  return {
    status: 200,
    body: {
      success: true,
      message: 'Success',
      data: data.data
    }
  };
};

module.exports = getUserVideos;
