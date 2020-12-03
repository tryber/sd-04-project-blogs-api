const createPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    // createdAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    //   field: 'published',
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    //   onUpdate: DataTypes.NOW,
    //   field: 'updated',
    // },
  },
  { createdAt: 'published', updatedAt: 'updated' },
  
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};

module.exports = createPost;
