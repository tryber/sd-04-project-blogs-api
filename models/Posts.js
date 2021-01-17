const createPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    constent: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    password: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'Users',
    });
  };

  return Posts;
};

module.exports = createPost;
