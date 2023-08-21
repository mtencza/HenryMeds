const { DataTypes } = require('sequelize');
const db = require('./server'); 

const Reservation = db.define('Reservations', {
    reservationid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    providerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    clientid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    creation_time: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
  });
  
module.exports = Reservation;