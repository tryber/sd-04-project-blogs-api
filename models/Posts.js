const PostsModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'Users',
    });
  };

  return Posts;
};

module.exports = PostsModel;
