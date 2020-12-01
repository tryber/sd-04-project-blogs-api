const createUserModel = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'Users',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
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
