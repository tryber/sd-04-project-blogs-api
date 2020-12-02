const Posts = (sequelize, DataTypes) => {
  const posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  posts.associate = (models) => {
    posts.belongsTo(models.Users,
      { foreignKey: 'id', as: 'user' });
  };

  return posts;
};

module.exports = Posts;
