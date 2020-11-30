const Users = (sequelize, DataTypes) => sequelize
  .define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    updateAt: false,
  });

module.exports = Users;
