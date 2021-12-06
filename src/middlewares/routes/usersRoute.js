const Router = require('@koa/router');
const axios = require('axios');
const router = new Router();
const db = require('../../db/models');
const logger = require('../../helpers/logger');

router.post('/users', async (ctx) => {
  const { name, email } = ctx.request.body;
  const res = await db.Users.findOne({
    where: {
      email,
    },
  });
  if (res) {
    ctx.status = 400;
    ctx.body = {
      succes: false,
      message: 'user with this email already exists',
    };
  } else {
    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'success',
      data: await db.Users.create({
        name,
        email,
      }),
    };
  }
});

router.get('/users', async (ctx) => {
  const id = ctx.request.query.id;
  const user = await db.Users.findOne({
    where: {
      id: id,
    },
  });

  const subscriptions = await axios
    .get(process.env.SUBSCRIPTIONS_SERVICE, {
      params: {
        userId: id,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      logger.log({
        message: e.message,
        level: 'info',
      });
    });
  const video = await axios
    .get(process.env.HISTORY_SERVICE, {
      params: {
        userId: id,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      logger.log({
        message: e.message,
        level: 'info',
      });
    });
  const history = await axios
    .get(process.env.HISTORY_SERVICE, {
      params: {
        userId: id,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      logger.log({
        message: e.message,
        level: 'info',
      });
    });
  ctx.body = {
    success: true,
    message: 'Success',
    data: {
      user,
      subscriptions,
      video,
      history,
    },
  };
});

router.get('/users/subscriptions', async (ctx) => {
  const id = ctx.request.query.id;
  const limit = ctx.request.query.limit;
  ctx.body = {
    success: true,
    message: 'Success',
    data: await axios
      .get(process.env.SUBSCRIPTIONS_SERVICE, {
        params: {
          userId: id,
          limit,
        },
      })
      .then((res) => res.data.data),
  };
});

router.get('/users/history', async (ctx) => {
  const id = ctx.request.query.id;
  const limit = ctx.request.query.limit;
  ctx.body = {
    success: true,
    message: 'Success',
    data: await axios
      .get(process.env.HISTORY_SERVICE, {
        params: {
          userId: id,
          limit,
        },
      })
      .then((res) => res.data.data),
  };
});

router.get('/users/videos', async (ctx) => {
  const id = ctx.request.query.id;
  const limit = ctx.request.query.limit;
  ctx.body = {
    success: true,
    message: 'Success',
    data: await axios
      .get(process.env.VIDEO_SEVICE, {
        params: {
          id,
          limit,
        },
      })
      .then((res) => res.data.data),
  };
});

module.exports = router;
