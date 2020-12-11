const createUserModel = (sequlize, DataTypes) => {
  const User = sequlize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'Post' });
  };

  return User;
};

module.exports = createUserModel;
