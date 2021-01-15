const createPost = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );

  post.associate = (models) => {
    post.belongsTo(models.Users, {
      foreingKey: 'userId',
      as: 'users',
    });
  };

  return post;
};

module.exports = createPost;
