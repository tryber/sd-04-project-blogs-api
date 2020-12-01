const User = (sequelize, DataTypes) => {
  const defineUser = sequelize.define(
    'User',
    {
      id: { type: DataTypes.STRING, autoIncrement: true, primaryKey: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return defineUser;
};

module.exports = User;
