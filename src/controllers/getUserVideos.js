const axios = require('axios');
const db = require('../db/models');

const getUserVideos = async (id, limit) => {
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
  const { data } = await axios.get('http://127.0.0.1:3008/videos', {
    params: {
      limit,
      userId: id
    }
  });
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
