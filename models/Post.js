const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  post.associate = (models) => {
    post.belongsTo(models.Users, { as: 'User', foreingKey: 'userId' });
  };

  return post;
};

module.exports = Post;
