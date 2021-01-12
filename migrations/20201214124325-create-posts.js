module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsTable = queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      userId: Sequelize.INTEGER,
      published: Sequelize.DATE,
      updated: Sequelize.DATE,
    });
    return postsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),

};
