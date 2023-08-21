const Schedule = require('../models/schedule');


//reservations/schedule
async function schedule(providerid, start_time, end_time) {
    try {

      //Get day from start
      const date = new Date(start_time);
      const day = date.getDate();
      const month = date.getMonth() + 1; //0 index so plus one
      const year = date.getFullYear();
      const scheduleDay = `${year}-${month}-${day}`; //YYYY-MM-DD
      
      //insert new schedule into schedules
      const newSchedule = await Schedule.create({
        providerid: providerid,
        start_time: start_time,
        end_time: end_time,
        date: scheduleDay,
      });
      
      return newSchedule;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    schedule,
};