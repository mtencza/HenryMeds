const Reservation = require('../models/reservation');
const Schedule = require('../models/schedule');

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

async function isReservationInSchedule(providerid, start_time, end_time) {
    //Get day from start
    const date = new Date(start_time);
    const day = date.getDate();
    const month = date.getMonth() + 1; //0 index so plus one
    const year = date.getFullYear();
    const reservationDay = `${year}-${month}-${day}`; //YYYY-MM-DD

    // Get schedule(s) for that provider/day only 
    const providerSchedules = await Schedule.findAll({
      where: {
        providerid: providerid,
        date: reservationDay,
      },
    });
  
    const reservationStartTime = new Date(start_time).getTime();
    const reservationEndTime = new Date(end_time).getTime();

    //Do check to make sure there is a schedule entry that overlaps with res
    const isValidScheduleEntry = providerSchedules.some(providerSchedule => {
        const scheduleStartTime = new Date(providerSchedule.start_time).getTime();
        const scheduleEndTime = new Date(providerSchedule.end_time).getTime();
        return (reservationStartTime >= scheduleStartTime
                && reservationEndTime <= scheduleEndTime);
    });
  
    return isValidScheduleEntry;
}


/*   POST /reservations   */
async function reserve(providerid, clientid, start_time, end_time) {
    try {
        //Reservations must be made at least 24 hours in advance
        if(!isValidReservation(start_time)) {
            throw new Error('Reservation must be made 24 hrs in advance');
        }

        //check that provider is working during that time
        if(!isReservationInSchedule(providerid, start_time, end_time)) {
            throw new Error('Provider is not working at that time');
        }

        //Check that a reservation isn't already present for the provider for this start and end time
        const existingReservation = await Reservation.findOne({
            where: {
                providerid: providerid,
                start_time: start_time,
                end_time: end_time,
                booked: true,
            },
        });

        //do 30 min check and delete existing reservation if expired
        if(existingReservation) {
            if(!existingReservation.confirmed && 
                !withinThirtyMin(existingReservation.creation_time)) { //booked but not confirmed
                await existingReservation.destroy();
            }
            else {
                throw new Error('Reservation already exists at that time');
            }
        }

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


/*   POST /reservations/confirmation   */
async function confirm(reservationid) {
    try {
        const existingReservation = await Reservation.findByPk(reservationid); 
        if (!existingReservation) {
            throw new Error('Reservation not found');
        }

        //Reservations expire after 30 mins if not confirmed
        if(!withinThirtyMin(existingReservation.creation_time)) {
            //delete existingg invalid reservation
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