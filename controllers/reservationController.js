const Reservation = require('../models/reservation');



async function reserve(providerid, clientid, start_time, end_time) {
    try {
        //Reservations must be made at least 24 hours in advance

        //Valid provider schedule

        const newReservation = await Reservation.create({
            providerid: providerid,
            clientid: clientid,
            booked: true,
            start_time: start_time,
            end_time: end_time,
        });
  
        return newReservation;
    } catch (error) {
      throw error;
    }
}



async function confirm(reservationid) {
    try {
        const reservation = await Reservation.findByPk(reservationid); 
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        //Reservations expire after 30 mins if not confirmed

  
        reservation.confirmed = true;
        await reservation.save();
        return reservation;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    confirm,
    reserve,
  };