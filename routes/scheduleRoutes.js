const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router.post('/reservations/schedule', async (req, res) => {
    const providerid = req.body.providerid;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    const errorStr = 'Missing fields: ';

    if(!providerid) {
        errorStr += 'providerid'
    }

    if(!start_time) {
        errorStr += ', start_time'
    }

    if(!end_time) {
        errorStr += ', end_time'
    }

    if(errorStr !== 'Missing fields: ') {
        res.status(400).json({ error: errorStr});
        return;
    }
  
    try {
      const schedule = await scheduleController.schedule(providerid, start_time, end_time);
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;