const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { /* A string "User" faz referencia à tabela criada em migration. Por convenção, fica no singular aqui, apesar de ser criada no plural lá. */
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return User;
};
module.exports = createUser;
