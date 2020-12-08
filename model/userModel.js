const userModel = (sequelize, DataTypes) => {
  const usuario = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      upTime: false,
    },
  );

  // Relação entre Users e Posts
  usuario.associate = (event) => {
    usuario.hasMany(event.Posts, {
      foreingKey: 'userId',
      as: 'Post',
    });
  };
  return usuario;
};

module.exports = userModel;
