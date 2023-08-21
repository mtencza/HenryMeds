const { DataTypes } = require('sequelize');
const db = require('./server'); 

const Schedule = db.define('Schedules', {
    scheduleid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    providerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY, //YYYY-MM-DD
        allowNull: false,
    }
  });
  
module.exports = Schedule;