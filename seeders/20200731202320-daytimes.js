'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Times', [{
      timeOfDay: 'Morning',
      },
      {
        timeOfDay: 'Noon',
      },
      {
        timeOfDay: 'Evening',
      },
      {
        timeOfDay: 'Bed Time',
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Times', null, {});
    
  }
};
