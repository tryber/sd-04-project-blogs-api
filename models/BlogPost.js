const blogPost = (sequelize, DataTypes) => {
  const defineBlog = sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.STRING, autoIncrement: true, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.STRING, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      createdAt: 'published',
      updatedAt: 'published',
    }
  );

  defineBlog.associate = (models) => {
    defineBlog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return defineBlog;
};

module.exports = blogPost;
