const Post = (sequelize, DataTypes) =>
  sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.DATE,
      },
      updated: {
        type: DataTypes.DATE,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      timestamps: false,
    },
  );

Post.associate = (models) => {
  Post.belongsTo(models.User, { foreign_key: 'userId', as: 'User' });
};

module.exports = Post;
