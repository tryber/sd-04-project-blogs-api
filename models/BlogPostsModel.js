const createBlogPostsModel = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    publishedAt: DataTypes.DATE,
    updateAt: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users,
      { foreignKey: 'user_id', as: 'Users' });
  };

  return BlogPosts;
};

module.exports = createBlogPostsModel;
