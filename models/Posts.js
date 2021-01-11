const Post = (sequelize, DataTypes) => {
  const createPost = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });
  createPost.associate = (models) => {
    createPost.belongsTo(models.User, { as: 'user', foreign_key: 'user_id' });
  };
  return createPost;
};

module.exports = Post;
