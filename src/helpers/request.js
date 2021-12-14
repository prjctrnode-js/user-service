const axios = require('axios');
const logger = require('./logger');

const request = async (url, method, params = {}, body = {}) => {
  try {
    const { data } = await axios({
      url,
      method,
      data: body,
      params
    });
    return data;
  } catch (error) {
    logger.log({
      message: error.message,
      level: 'info'
    });
  }
  return [];
};

module.exports = request;
