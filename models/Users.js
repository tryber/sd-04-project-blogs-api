const createUsers = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.Posts, {
      foreignKey: 'userId',
      as: 'Posts',
    });
  };

  return user;
};

module.exports = createUsers;
