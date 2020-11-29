const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    { timestamps: false }
  );

  User.associate = (models) => {
    User.hasMany(models.Posts, {
      foreignKey: 'id',
      as: 'Users',
    });
  };

  return User;
};

module.exports = UserModel;
