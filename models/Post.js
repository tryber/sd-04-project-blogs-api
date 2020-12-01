module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: { type: DataTypes.STRING, foreignKey: true },
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { timestamps: false },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User),
      {
        foreignKey: 'user_id',
        as: 'user',
      };
  };

  return Post;
};
