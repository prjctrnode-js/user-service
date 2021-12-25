const bcrypt = require('bcryptjs');
const db = require('../db/models');

const createUser = async (name, email, password) => {
  const res = await db.Users.findOne({
    where: {
      email
    }
  });
  if (res) {
    return {
      status: 400,
      body: {
        succes: false,
        message: 'user with this email already exists'
      }
    };
  }
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const data = await db.Users.create({
    name,
    email,
    password: hashedPassword
  });
  return {
    status: 201,
    body: {
      success: true,
      message: 'success',
      data: {
        name: data.name,
        email: data.email,
        id: data.id
      }
    }
  };
};

module.exports = createUser;
