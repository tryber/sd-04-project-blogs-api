const User = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  });
  User.associate = () => {
    User.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });
  };
  return User;
};

module.exports = User;
