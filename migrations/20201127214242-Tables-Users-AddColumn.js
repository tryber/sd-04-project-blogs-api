module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface
      .addColumn('Users', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
      })
      .queryInterface.addColumn('Users', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
      }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
