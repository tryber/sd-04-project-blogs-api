const Post = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });
  // eslint-disable-next-line no-unreachable
  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreign_key: 'user_id' });
  };
};

module.exports = Post;
