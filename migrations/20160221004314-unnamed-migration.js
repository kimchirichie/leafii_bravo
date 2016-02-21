'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('webforms','user_id',Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('webforms','user_id');
  }
};
