const registerUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return User;
};

module.exports = registerUser;
