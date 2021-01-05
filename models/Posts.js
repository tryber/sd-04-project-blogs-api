const createNewPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Users',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  return Posts;
};

module.exports = createNewPost;
