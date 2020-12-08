const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Posts, { foreignKey: 'userId', sourceKey: 'id' });
  };
  return User;
};

module.exports = createUser;
