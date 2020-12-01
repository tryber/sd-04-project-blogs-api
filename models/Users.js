const UsersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timeStamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, { foreignKey: 'userId', as: 'user' });
  };

  return Users;
};

module.exports = UsersModel;
