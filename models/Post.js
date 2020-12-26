const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    createdAt: 'published', /* stackoverflow "sequelize change createdat name" */
    updatedAt: 'updated',
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreighKey: 'userId' });
  };

  return Post;
};

module.exports = createPost;
