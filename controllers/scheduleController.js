const Schedule = require('../models/schedule');


//reservations/schedule
async function schedule(providerid, start_time, end_time) {
    try {
      //insert new schedule into schedules
      const newSchedule = await Schedule.create({
        providerid: providerid,
        start_time: start_time,
        end_time: end_time,
      });
      
      return newSchedule;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    schedule,
};