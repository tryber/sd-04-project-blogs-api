const User = (sequelize, DataTypes) =>
  sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      validate: {
        len: [8],
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: { type: DataTypes.INTEGER, validate: { len: [6], notEmpty: true } },
    image: DataTypes.STRING,
  });

module.exports = User;
