'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users','admin',{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users','admin');
  }
};
