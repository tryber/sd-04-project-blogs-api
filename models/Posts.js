const createPosts = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { timestamps: false },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Posts;
};

module.exports = createPosts;
