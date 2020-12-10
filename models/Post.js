const PostModel = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreign_key: 'userId' });
  };
  return Post;
};
module.exports = PostModel;
