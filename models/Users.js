const Users = (sequelize, DataTypes) => {
  const createUser = sequelize.define('Users', {
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
      allowNull: false,
      validate: {
        isEmail: {
          msg: '"email" must be a valid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: '"password" length must be 6 characters long',
        },
      },
    },
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  createUser.associate = (models) => {
    createUser.hasMany(models.Posts, { foreignKey: 'id', as: 'user' });
  };
  return createUser;
};

module.exports = Users;
