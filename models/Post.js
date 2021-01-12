const PostModel = (sequelize, DataTypes) =>
  sequelize.define('Posts', {
    title: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, { timestamps: false });

module.exports = PostModel;
