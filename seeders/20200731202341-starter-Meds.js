'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Medicines', [{
      name: 'Tylenol',
      dosage: '500mg'
      },
      {
        name: 'Ibuprofen',
        dosage: '200mg'
      },
      {
        name: 'Vitamin C',
        dosage: '500mg'
      },
      {
        name: 'Vitamin D',
        dosage: '5000mg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Medicines', null, {});
  }
};
