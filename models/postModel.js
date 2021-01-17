const createPost = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      createdAt: 'published', updatedAt: 'updated',
    },
  );

  post.associate = (models) => {
    post.belongsTo(models.Users, {
      foreingKey: 'userId',
      as: 'user',
    });
  };

  return post;
};

module.exports = createPost;
