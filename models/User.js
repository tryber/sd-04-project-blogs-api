const User = (sequelize, DataTypes) => {
  const defineUser = sequelize.define(
    'User',
    {
      id: { type: DataTypes.STRING, autoIncrement: true, primaryKey: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  defineUser.associate = (models) => {
    defineUser.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'blog',
    });
  };

  return defineUser;
};

module.exports = User;
