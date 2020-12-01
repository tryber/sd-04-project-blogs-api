module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      displayName: { allownull: false, type: Sequelize.STRING },
      email: { allownull: false, unique: true, type: Sequelize.STRING },
      password: { allownull: false, type: Sequelize.STRING },
      image: { allownull: false, type: Sequelize.STRING },
    });

    return UsersTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
