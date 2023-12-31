const Schedule = require('../models/schedule');

// POST reservations/schedule
async function schedule(providerid, start_time, end_time) {
    try {
        //Get day from start time
        const date = new Date(start_time);
        const day = date.getDate();
        const month = date.getMonth() + 1; //0 index so plus one
        const year = date.getFullYear();
        const scheduleDay = `${year}-${month}-${day}`; //YYYY-MM-DD

        //Get schedule(s) for that provider/day only 
        const providerSchedules = await Schedule.findAll({
          where: {
          providerid: providerid,
          date: scheduleDay,
          },
        });
    
        const newScheduleStartTime = new Date(start_time).getTime();
        const newScheduleEndTime = new Date(end_time).getTime();
  
        //Check if there is existing schedule occupying the same time
        const overlappingSchedule = providerSchedules.some(providerSchedule => {
        const existingScheduleStartTime = new Date(providerSchedule.start_time).getTime();
        const existingScheduleEndTime = new Date(providerSchedule.end_time).getTime();
        return (newScheduleStartTime >= existingScheduleStartTime
            && newScheduleEndTime <= existingScheduleEndTime
            );
        });

        if(overlappingSchedule) {
            throw new Error('Provider alreaady booked to work at that time');
        }

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