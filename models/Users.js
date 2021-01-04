const User = (sequelize, DataTypes) => sequelize.define('User', {
  displayName: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [8],
        msg: '"displayName" length must be 8 characters long',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: '"email" must be a valid email',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [6],
        msg: '"password" length must be 6 characters long',
      },
    },
  },
  image: DataTypes.STRING,
}, {
  timestamps: false,
});

module.exports = User;
