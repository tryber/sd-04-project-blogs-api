const Post = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
    },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { as: 'user', foreingKey: 'userId' });
  };

  return Posts;
};
module.exports = Post;
