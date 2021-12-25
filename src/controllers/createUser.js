const db = require('../db/models');

const createUser = async (name, email) => {
  const res = await db.Users.findOne({
    where: {
      email
    }
  });
  if (res) {
    const error = {
      statusCode: 400,
      message: 'user with this email already exists'
    };
    throw error;
  }
  const data = await db.Users.create({
    name,
    email
  });
  return {
    status: 201,
    body: {
      success: true,
      message: 'success',
      data
    }
  };
};

module.exports = createUser;
