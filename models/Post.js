const createPost = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      'Post',
      {
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
          allowNull: false,
          foreignKey: true,
        },
        published: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updated: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      },
      { timestamps: false },
    );
    Post.associate = (models) => {
        Post.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      };
    return Post;
  };
  
  module.exports = createPost;
  