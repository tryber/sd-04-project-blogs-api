module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    return UsersTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
