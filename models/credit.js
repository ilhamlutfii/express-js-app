'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const Course = psqlCon.sequelize.define('credits', {
  // attributes
  id: { type: Sequelize.INTEGER, primaryKey: true },
  user_id: { type: Sequelize.INTEGER},
  name: { type: Sequelize.STRING },

}, {
  freezeTableName: true,
  tableName: 'credits',
  createdAt: false,
  updatedAt: false,
});


module.exports = {
  Credit
};

