'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const Course = psqlCon.sequelize.define('courses', {
  // attributes
  id: { type: Sequelize.INTEGER, primaryKey: true },
  user_id: { type: Sequelize.STRING },
  first_name: { type: Sequelize.STRING },
  last_name : { type: Sequelize.STRING},
  headline : { type: Sequelize.STRING},
  biography: { type: Sequelize.STRING },
  language: { type: Sequelize.STRING },
  website: { type: Sequelize.STRING },
  twitter: { type: Sequelize.STRING },
  facebook : { type: Sequelize.STRING},
  linkedin : { type: Sequelize.STRING},

  created_at: { type: Sequelize.DATE },
  updated_at: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'profiles',
  createdAt: false,
  updatedAt: false,
});


module.exports = {
  Profile
};

