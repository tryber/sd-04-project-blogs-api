const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return Users;
};

module.exports = createUsers;
