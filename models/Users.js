const createUser = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  user.associate = (models) => {
    user.hasMany(models.Post, {
      foreingKey: 'userId',
      as: 'Post',
    });
  };
  return user;
};

module.exports = createUser;
