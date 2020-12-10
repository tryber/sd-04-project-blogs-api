const users = (sequelize, DataTypes) =>
  sequelize.define(
    'users',
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
module.exports = users;
