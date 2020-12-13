// const postsModel = (sequelize, DataTypes) => {
//   const Posts = sequelize.define(
//     'Posts',
//     {
//       title: DataTypes.STRING,
//       content: DataTypes.STRING,
//       userId: { type: DataTypes.INTEGER, foreignKey: true },
//       published: DataTypes.DATE,
//       updated: DataTypes.DATE,
//     },
//     { timestamps: false },
//   );

//   Posts.associate = (models) => {
//     Posts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
//   };

//   return Posts;
// };

// module.exports = postsModel;
