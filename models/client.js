const { DataTypes } = require('sequelize');
const db = require('./server'); // import  Sequelize db instance

const Client = db.define('Clients', {
    clientid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  });
  
module.exports = Client;