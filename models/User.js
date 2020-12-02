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
  return User;
};

module.exports = registerUser;
