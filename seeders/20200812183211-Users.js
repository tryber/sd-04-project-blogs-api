module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '$2a$10$.f5NJgvS8AodZS2hLzJCoOG5S0ZuUt7qyYzzmpp.ZqMB/UV.Cj9cO',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: '$2a$10$.f5NJgvS8AodZS2hLzJCoOG5S0ZuUt7qyYzzmpp.ZqMB/UV.Cj9cO',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
