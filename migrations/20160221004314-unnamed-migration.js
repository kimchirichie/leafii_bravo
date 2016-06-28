'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'profiles',
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
        user_id: Sequelize.INTEGER,
        first: Sequelize.STRING,
        last: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        company: Sequelize.STRING,
        about: Sequelize.STRING,
        contents: Sequelize.TEXT
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('profiles');
  }
};
