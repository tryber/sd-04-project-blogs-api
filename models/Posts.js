const Posts = (sequelize, DataTypes) => {
  const posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    timestamps: false,
  });

  posts.associate = (models) => {
    posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = Posts;
