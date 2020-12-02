const Posts = (sequelize, DataTypes) => {
  const posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
    {
      timestamps: false,
    }
  );

  posts.associate = (models) => {
    posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'posts' }
    )
  };

  return posts;
};

module.exports = Posts;
