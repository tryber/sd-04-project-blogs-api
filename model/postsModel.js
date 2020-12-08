const postsModel = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    'Posts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  posts.associate = (event) => {
    posts.belongsTo(event.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return posts;
};

module.exports = postsModel;
