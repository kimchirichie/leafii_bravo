'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.dropTable('signup');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'signup',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING
      }
    );
  }
};
