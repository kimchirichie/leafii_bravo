'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('templates', 'webforms');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('webforms', 'templates');
  }
};
