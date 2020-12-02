module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: '2010/10/10',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: '2010/10/10',
        type: Sequelize.DATE,
      },
    });

    return UsersTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
