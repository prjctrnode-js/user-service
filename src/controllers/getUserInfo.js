const axios = require('axios');
const logger = require('../helpers/logger');
const db = require('../db/models');

const getUserInfo = async (ctx) => {
  const { id } = ctx.request.query;
  const user = await db.Users.findOne({
    where: {
      id
    }
  });
  const subscriptions = await axios
    .get(process.env.SUBSCRIPTIONS_SERVICE, {
      params: {
        userId: id
      }
    })
    .then((res) => res.data.data)
    .catch((e) => {
      logger.log({
        message: e.message,
        level: 'info'
      });
    });
  const video = await axios
    .get(process.env.VIDEO_SEVICE, {
      params: {
        userId: id
      }
    })
    .then((res) => res.data.data)
    .catch((e) => {
      logger.log({
        message: e.message,
        level: 'info'
      });
    });
  const history = await axios
    .get(process.env.HISTORY_SERVICE, {
      params: {
        userId: id
      }
    })
    .then((res) => res.data.data)
    .catch((e) => {
      logger.log({
        message: e.message,
        level: 'info'
      });
    });
  ctx.body = {
    success: true,
    message: 'Success',
    data: {
      user,
      subscriptions,
      video,
      history
    }
  };
};

module.exports = getUserInfo;
