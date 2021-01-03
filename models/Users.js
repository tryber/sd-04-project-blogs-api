const userModel = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  user.associate = (models) => {
    user.hasMany(models.Posts, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return user;
};

module.exports = userModel;
