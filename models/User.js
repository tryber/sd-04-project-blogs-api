const UserModel = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
    {
      timestamps: false,
    });
};

module.exports = UserModel;
