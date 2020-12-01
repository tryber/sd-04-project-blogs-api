module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable(
      "Users",
      {
        id: {
          alllowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        displayName: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        image: {
          allowNull: true,
          type: Sequelize.STRING,
        },
      },
      { timestamps: false }
    );
    return UsersTable;
  },

  down: async (queryInterface) => queryInterface.dropTable("Users"),
};
