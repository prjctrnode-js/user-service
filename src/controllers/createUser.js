const db = require('../db/models');

const createUser = async (ctx) => {
  const { name, email } = ctx.request.body;
  const res = await db.Users.findOne({
    where: {
      email
    }
  });
  if (res) {
    ctx.status = 400;
    ctx.body = {
      succes: false,
      message: 'user with this email already exists'
    };
  } else {
    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'success',
      data: await db.Users.create({
        name,
        email
      })
    };
  }
};

module.exports = createUser;
