const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    // published: DataTypes.DATE,
    // updated: DataTypes.DATE,
  },);
  Post.associate = (models) => {
    Post.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  };
  return Post;
};

module.exports = Post;
