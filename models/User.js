const User = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    displayName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8],
          msg: '"displayName" length must be at least 8 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: '"email" must be a valid email',
        },
        notEmpty: {
          msg: '"email" is required',
        },
      },
    },
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, { timestamps: false });
  User.associate = (models) => {
    User.hasMany(models.Posts, { as: 'posts', foreignKey: 'userId' });
  };
  return User;
};

module.exports = User;
