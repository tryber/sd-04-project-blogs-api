module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
      published: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING,
      },
      updated: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING,
      },
    });
    return BlogPostsTable;
  },
  down: async (queryInterface) => queryInterface.dropTable('BlogPosts'),
};
