const createUserModel = (sequelize, DataTypes) => {
  const userModel = sequelize.define(
    'Users',
    {
      displayName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8],
            msg: 'displayName must be at least 8 chars',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'email must be valid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: 'password must be at least 6 chars',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timeStamp: false },
  );

  return userModel;
};

module.exports = createUserModel;
