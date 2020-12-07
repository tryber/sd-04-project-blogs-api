module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'published',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated',
      },
    });
    return PostsTable;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('Posts');
  },
};
