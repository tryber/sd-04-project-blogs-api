const createUsersModel = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  return user;
};

module.exports = createUsersModel;
