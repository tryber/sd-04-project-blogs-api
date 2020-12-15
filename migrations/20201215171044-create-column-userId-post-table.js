module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Posts', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),

  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('userId'), /* not working */
};
