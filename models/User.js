const User = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, { timestamps: false });
  User.associate = (models) => {
    User.hasMany(models.Posts, { as: 'posts', foreignKey: 'userId' });
  };
  return User;
};

module.exports = User;
