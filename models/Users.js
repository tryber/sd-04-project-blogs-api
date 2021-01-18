const createUserModel = (sequelize, DataTypes) => {
  const userModel = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return userModel;
};

module.exports = createUserModel;
