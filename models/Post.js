const Post = (sequelize, DataTypes) => {
  const createPost = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    // published: DataTypes.DATE,
    // updated: DataTypes.DATE,
  });
  createPost.associate = (models) => {
    // userId talvez tenha que mudar para id
    createPost.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  };
  return createPost;
};

module.exports = Post;
