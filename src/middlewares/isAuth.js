const jwt = require('jsonwebtoken');
const db = require('../db/models');

const isAuth = async (ctx, next) => {
  const token = ctx.headers['x-token'];
  if (!token) {
    const error = { statusCode: 401, message: 'missing token' };
    throw error;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (new Date() > new Date(decodedToken.exp * 1000)) {
    const error = { statusCode: 401, message: 'token expired' };
    throw error;
  }
  const user = await db.Users.findOne({
    where: {
      id: decodedToken.data && decodedToken.data.id,
      email: decodedToken.data && decodedToken.data.email
    }
  });
  if (!user) {
    const error = { statusCode: 401, message: 'wrong token' };
    throw error;
  }
  ctx.user = user.get({ plain: true });
  return next();
};

module.exports = isAuth;
