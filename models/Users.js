const Users = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return UsersTable;
};

module.exports = Users;
