const PostsModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    { createdAt: 'published', updatedAt: 'updated' },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Posts;
};

module.exports = PostsModel;
