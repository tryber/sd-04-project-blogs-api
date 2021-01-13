const User = (sequelize, DataTypes) =>
  sequelize.define(
    'Users',
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
        },
      },
      password: {
        type: DataTypes.INTEGER,
        validate: {
          len: {
            args: [6],
            msg: '"password" length must be 6 characters long',
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
