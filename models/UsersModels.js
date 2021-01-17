const createUsersModel = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'Users',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  user.associate = (models) => {
    user.hasMany(models.Posts, {
      foreingKey: 'userId',
      as: 'posts',
    });
  };
  return user;
};

module.exports = createUsersModel;
