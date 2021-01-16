const createPostModel = (sequelize, DataTypes) => {
  const postModel = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  postModel.associate = (models) => {
    postModel.belongsTo(models.Users, { as: 'user', foreingKey: 'userId' });
  };

  return postModel;
};

module.exports = createPostModel;
