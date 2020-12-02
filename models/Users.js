const createUserModel = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return users;
};

module.exports = createUserModel;
