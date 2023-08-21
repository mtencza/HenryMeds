const { DataTypes } = require('sequelize');
const db = require('./server'); 

const Provider = db.define('Providers', {
    providerid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  });
  
module.exports = Provider;