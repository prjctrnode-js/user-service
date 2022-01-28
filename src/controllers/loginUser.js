const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/models');

const LoginUser = async (email, password) => {
  const user = await db.Users.findOne({
    where: {
      email
    }
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      status: 401,
      body: {
        succes: false,
        message: 'incorrect username or password'
      }
    };
  }
  const token = jwt.sign(
    {
      data: { id: user.id, email: user.email, name: user.name }
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return {
    status: 200,
    body: {
      success: true,
      message: 'user logged in',
      data: {
        name: user.name,
        id: user.id,
        token
      }
    }
  };
};

module.exports = LoginUser;
