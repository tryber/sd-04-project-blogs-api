const Posts = (sequelize, DataTypes) => {
  const PostsTable = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  });

  PostsTable.associate = (models) => {
    PostsTable.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return PostsTable;
};

module.exports = Posts;
