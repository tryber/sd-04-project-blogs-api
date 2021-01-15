const createPostsModel = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    'Posts',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    { createdAt: 'published', updatedAt: 'updated' },
  );

  posts.associate = (models) => {
    posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = createPostsModel;
