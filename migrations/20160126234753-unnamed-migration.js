'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('templates','domains',Sequelize.STRING);
    queryInterface.addColumn('templates','quote',Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('templates','domains');
    queryInterface.removeColumn('templates','quote');
  }
};
