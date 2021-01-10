const User = (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      displayName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8],
            msg: '"displayName" length must be at least 8 characters long',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: '"email" must be a valid email',
          },
          notEmpty: {
            msg: '"email" is not allowed to be empty',
          },
        },
      },
      password: {
        type: DataTypes.INTEGER,
        validate: {
          len: {
            args: [6],
            msg: '"password" length must be 6 characters long',
          },
          notEmpty: {
            msg: '"password" is not allowed to be empty',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    },
  );

module.exports = User;
