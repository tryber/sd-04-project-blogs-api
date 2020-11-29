const createPost = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'Post',
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

  post.associate = (models) => {
    post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return post;
};

module.exports = createPost;
