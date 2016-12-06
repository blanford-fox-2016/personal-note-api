'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.removeColumn('Notes', 'UserId')
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.addColumn('Notes', 'UserId', {
          type: Sequelize.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
