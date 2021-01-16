const Posts = (sequelize, DataTypes) => {
  const createPost = sequelize.define('Posts', {
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
  { timestamps: false });
  createPost.associate = (models) => {
    createPost.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  return createPost;
};

module.exports = Posts;
