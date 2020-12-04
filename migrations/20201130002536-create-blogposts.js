module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable('Posts', {
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
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {
        allowNull: false,
        defaultValue: '2010/10/10',
        type: Sequelize.DATE,
      },
      updated: {
        allowNull: false,
        defaultValue: '2010/10/10',
        type: Sequelize.DATE,
      },
    });

    return BlogPostsTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
