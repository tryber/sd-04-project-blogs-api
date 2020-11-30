const Users = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });
}

module.exports = Users;
