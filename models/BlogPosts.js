const createPosts = (sequelize, DataTypes) => {
  const posts = sequelize.define('Posts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, {
    createdAt: 'published', updatedAt: 'updated',
  });

  posts.associate = (models) => {
    posts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'Users',
    });
  };

  return posts;
};

module.exports = createPosts;
