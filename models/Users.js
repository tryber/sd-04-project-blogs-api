const Users = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: false,
  });
  return user;
};

module.exports = Users;
