'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
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
        username: {
          type: Sequelize.STRING,
          unique: true
        },
        password: Sequelize.STRING,
        salt: Sequelize.STRING
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('signup');
  }
};