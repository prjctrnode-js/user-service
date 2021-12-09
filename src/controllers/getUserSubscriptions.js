const axios = require('axios');

const getUserSubscriptions = async (ctx) => {
  const { id } = ctx.request.query;
  const { limit } = ctx.request.query;
  ctx.body = {
    success: true,
    message: 'Success',
    data: await axios
      .get(process.env.SUBSCRIPTIONS_SERVICE, {
        params: {
          userId: id,
          limit
        }
      })
      .then((res) => res.data.data)
  };
};

module.exports = getUserSubscriptions;
