module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'published',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated',
      },
    });

    return PostsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),
};
