module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable('Posts', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'userId',
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    return BlogPostsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),
};
