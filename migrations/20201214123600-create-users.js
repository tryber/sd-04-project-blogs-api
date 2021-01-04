module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable = queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      displayName: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      image: Sequelize.STRING,
    });
    return usersTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Users'),

};
