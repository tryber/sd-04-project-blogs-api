module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Posts',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        published: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Posts');
  },
};
