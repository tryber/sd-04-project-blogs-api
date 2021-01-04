const createNewPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Users',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  return Posts;
};

module.exports = createNewPost;
