const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('dbtest', 'bulbazavr', 'OPG2003OPG555', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432'
});

module.exports = sequelize;