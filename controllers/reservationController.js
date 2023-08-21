const Reservation = require('../models/reservation');

function isValidReservation(start_time) {
    const startTime = new Date(start_time).getTime();
    const currentTime = Date.now();
    const twentyFourHr = 24 * 60 * 60 * 1000;

    return (startTime - currentTime >= twentyFourHr);
}

//checks if time passed in is within 30 min of current time
function withinThirtyMin(time_to_check) {
    const time = new Date(time_to_check).getTime();
    const currentTime = Date.now();
    const thirtyMin = 30 * 60 * 1000;

    return (currentTime - time <= thirtyMin);
}

async function reserve(providerid, clientid, start_time, end_time) {
    try {
        //Reservations must be made at least 24 hours in advance
        if(!isValidReservation(start_time)) {
            throw new Error('Reservation must be made 24 hrs in advance');
        }

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
        const existingReservation = await Reservation.findByPk(reservationid); 
        if (!existingReservation) {
            throw new Error('Reservation not found');
        }

        //Reservations expire after 30 mins if not confirmed
        if(!withinThirtyMin(existingReservation.creation_time)) {
            //delete reservation
            await existingReservation.destroy();
            throw new Error('Reservation must be confirmed within 30 minutes');
        }

  
        existingReservation.confirmed = true;
        await existingReservation.save();
        return existingReservation;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    confirm,
    reserve,
  };