const User = (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
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
      password: {
        type: DataTypes.INTEGER,
        validate: {
          len: {
            args: [6],
            msg: '"password" length must be 6 characters long',
          },
          notEmpty: {
            msg: '"password" is required',
          },
        },
      },
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

User.associate = (models) => {
  User.hasMany(models.Post, { foreign_key: 'id', as: 'posts' });
};

module.exports = User;
