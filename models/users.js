const users = (sequelize, DataTypes) =>
  sequelize.define('users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });

module.exports = users;
