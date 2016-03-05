'use strict';

module.exports = {
up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('traffic', 'traffics');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('traffics', 'traffic');
  }
};
