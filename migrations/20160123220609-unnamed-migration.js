'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'template',
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
        first: Sequelize.STRING,
        last: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        school: Sequelize.STRING,
        program: Sequelize.STRING,
        profession: Sequelize.STRING,
        about: Sequelize.STRING,
        content: Sequelize.TEXT
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('template');
  }
};
