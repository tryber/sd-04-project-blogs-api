const registerUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 255],
            msg: '\"displayName\" length must be at least 8 characters long',
          },
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: '\"email\" is required',
          },
          notEmpty: {
            msg: '\"email\" is not allowed to be empty',
          },
          isEmail: {
            msg: '\"email\" must be a valid email',
          },
        },
        unique: {
          args: true,
          msg: 'Usuário já existe',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: '\"password\" is required',
          },
          notEmpty: {
            msg: '\"password\" is not allowed to be empty',
          },
          len: {
            args: [6, 255],
            msg: '\"password\" length must be 6 characters long',
          },
        },
      },
      image: DataTypes.STRING,
    },
    { timestamps: false }
  );
  return User;
};

module.exports = registerUser;
